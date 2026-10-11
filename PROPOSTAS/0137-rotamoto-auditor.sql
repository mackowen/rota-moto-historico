-- PROPOSTA: executar somente por DBA autorizado, após revisão/aprovação separada.
-- Nunca executar como rotamoto_migrator. Esta etapa da Campanha 0137 não aplica este arquivo.
-- Alvo fixo: banco rotamoto, migration oficial 0040.
-- Senha não é definida aqui; use o comando psql \password em sessão interativa.

BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '30s';

DO $create_role$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'rotamoto_auditor') THEN
    CREATE ROLE rotamoto_auditor;
  END IF;
END
$create_role$;

ALTER ROLE rotamoto_auditor
  LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS
  CONNECTION LIMIT 2;
ALTER ROLE rotamoto_auditor SET default_transaction_read_only = 'on';
ALTER ROLE rotamoto_auditor IN DATABASE rotamoto
  SET default_transaction_read_only = 'on';

-- Remova somente ACLs diretamente atribuídas a esta role. Não altere PUBLIC,
-- outras roles, ownership, RLS, funções da aplicação ou dados operacionais.
REVOKE ALL PRIVILEGES ON DATABASE rotamoto FROM rotamoto_auditor;
GRANT CONNECT ON DATABASE rotamoto TO rotamoto_auditor;
REVOKE ALL PRIVILEGES ON SCHEMA rotamoto FROM rotamoto_auditor;
GRANT USAGE ON SCHEMA rotamoto TO rotamoto_auditor;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA rotamoto FROM rotamoto_auditor;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA rotamoto FROM rotamoto_auditor;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA rotamoto FROM rotamoto_auditor;
GRANT SELECT (migration_id, checksum_sha256, applied_at)
  ON TABLE rotamoto.schema_migrations TO rotamoto_auditor;

-- Fail closed if inherited PUBLIC privileges, membership, ownership, or the
-- actual installed ACL state defeats the intended read-only boundary.
DO $validate_auditor$
DECLARE
  auditor_oid oid := (SELECT oid FROM pg_catalog.pg_roles WHERE rolname='rotamoto_auditor');
  ledger_oid oid := pg_catalog.to_regclass('rotamoto.schema_migrations');
BEGIN
  IF auditor_oid IS NULL OR ledger_oid IS NULL THEN
    RAISE EXCEPTION 'Role ou rotamoto.schema_migrations indisponível; nenhuma configuração aprovada.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members m
      WHERE m.member=auditor_oid OR m.roleid=auditor_oid) THEN
    RAISE EXCEPTION 'rotamoto_auditor possui associação de role; revise memberships antes da instalação.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_shdepend d
      WHERE d.refclassid='pg_catalog.pg_authid'::regclass AND d.refobjid=auditor_oid AND d.deptype='o') THEN
    RAISE EXCEPTION 'rotamoto_auditor possui ownership de objeto; remova a propriedade antes da instalação.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_database d WHERE d.datname='rotamoto' AND d.datdba=auditor_oid)
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_namespace n WHERE n.nspname='rotamoto' AND n.nspowner=auditor_oid)
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
        WHERE n.nspname='rotamoto' AND c.relowner=auditor_oid)
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid=p.pronamespace
        WHERE n.nspname='rotamoto' AND p.proowner=auditor_oid)
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_type t JOIN pg_catalog.pg_namespace n ON n.oid=t.typnamespace
        WHERE n.nspname='rotamoto' AND t.typowner=auditor_oid) THEN
    RAISE EXCEPTION 'rotamoto_auditor é owner de objeto; revise ownership antes da instalação.';
  END IF;
  IF (SELECT rolsuper OR rolcreatedb OR rolcreaterole OR rolreplication OR rolbypassrls OR NOT rolcanlogin OR rolinherit
      FROM pg_catalog.pg_roles WHERE oid=auditor_oid) THEN
    RAISE EXCEPTION 'Atributos efetivos de role não correspondem ao perfil auditor.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_db_role_setting s
      WHERE s.setrole=auditor_oid AND s.setdatabase=(SELECT oid FROM pg_catalog.pg_database WHERE datname='rotamoto')
        AND 'default_transaction_read_only=on'=ANY(s.setconfig)) THEN
    RAISE EXCEPTION 'Default transaction read-only não está configurado para rotamoto_auditor.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_db_role_setting s
      WHERE s.setrole=auditor_oid AND s.setdatabase=0
        AND 'default_transaction_read_only=on'=ANY(s.setconfig)) THEN
    RAISE EXCEPTION 'Default transaction read-only global não está configurado para rotamoto_auditor.';
  END IF;
  IF NOT pg_catalog.has_database_privilege('rotamoto_auditor','rotamoto','CONNECT')
     OR pg_catalog.has_database_privilege('rotamoto_auditor','rotamoto','CREATE')
     OR pg_catalog.has_database_privilege('rotamoto_auditor','rotamoto','TEMPORARY') THEN
    RAISE EXCEPTION 'CONNECT deve ser o único privilégio efetivo de database.';
  END IF;
  IF NOT pg_catalog.has_schema_privilege('rotamoto_auditor','rotamoto','USAGE')
     OR pg_catalog.has_schema_privilege('rotamoto_auditor','rotamoto','CREATE') THEN
    RAISE EXCEPTION 'Privilégios efetivos no schema rotamoto excedem USAGE.';
  END IF;
  IF NOT pg_catalog.has_column_privilege('rotamoto_auditor',ledger_oid,'migration_id','SELECT')
     OR NOT pg_catalog.has_column_privilege('rotamoto_auditor',ledger_oid,'checksum_sha256','SELECT')
     OR NOT pg_catalog.has_column_privilege('rotamoto_auditor',ledger_oid,'applied_at','SELECT')
     OR pg_catalog.has_table_privilege('rotamoto_auditor',ledger_oid,'INSERT')
     OR pg_catalog.has_table_privilege('rotamoto_auditor',ledger_oid,'UPDATE')
     OR pg_catalog.has_table_privilege('rotamoto_auditor',ledger_oid,'DELETE')
     OR pg_catalog.has_table_privilege('rotamoto_auditor',ledger_oid,'TRUNCATE') THEN
    RAISE EXCEPTION 'ACL da tabela schema_migrations não corresponde ao SELECT de colunas aprovado.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_attribute a
      WHERE a.attrelid=ledger_oid AND a.attnum>0 AND NOT a.attisdropped
        AND a.attname NOT IN ('migration_id','checksum_sha256','applied_at')
        AND pg_catalog.has_column_privilege('rotamoto_auditor',ledger_oid,a.attnum,'SELECT')) THEN
    RAISE EXCEPTION 'SELECT excedente detectado em schema_migrations.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='rotamoto' AND c.relkind IN ('r','p','v','m','f') AND c.oid<>ledger_oid
        AND (pg_catalog.has_table_privilege('rotamoto_auditor',c.oid,'SELECT')
          OR pg_catalog.has_table_privilege('rotamoto_auditor',c.oid,'INSERT')
          OR pg_catalog.has_table_privilege('rotamoto_auditor',c.oid,'UPDATE')
          OR pg_catalog.has_table_privilege('rotamoto_auditor',c.oid,'DELETE')
          OR pg_catalog.has_table_privilege('rotamoto_auditor',c.oid,'TRUNCATE'))) THEN
    RAISE EXCEPTION 'Privilégio em relação operacional detectado.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='rotamoto' AND c.relkind='S'
        AND (pg_catalog.has_sequence_privilege('rotamoto_auditor',c.oid,'USAGE')
          OR pg_catalog.has_sequence_privilege('rotamoto_auditor',c.oid,'SELECT')
          OR pg_catalog.has_sequence_privilege('rotamoto_auditor',c.oid,'UPDATE'))) THEN
    RAISE EXCEPTION 'Privilégio em sequence detectado.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid=p.pronamespace
      WHERE n.nspname='rotamoto' AND p.prosecdef
        AND pg_catalog.has_function_privilege('rotamoto_auditor',p.oid,'EXECUTE')) THEN
    RAISE EXCEPTION 'Execução de SECURITY DEFINER acessível à role auditor; revise ACLs antes da instalação.';
  END IF;
END
$validate_auditor$;

COMMIT;
