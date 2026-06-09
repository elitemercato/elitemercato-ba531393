-- Lock down email queue helper functions: restrict to service_role and pin search_path
DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid, p.proname, pg_get_function_identity_arguments(p.oid) AS args
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN ('delete_email','enqueue_email','move_to_dlq','read_email_batch')
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION public.%I(%s) FROM PUBLIC, anon, authenticated;', fn.proname, fn.args);
    EXECUTE format('GRANT EXECUTE ON FUNCTION public.%I(%s) TO service_role;', fn.proname, fn.args);
    EXECUTE format('ALTER FUNCTION public.%I(%s) SET search_path = public, pgmq, extensions;', fn.proname, fn.args);
  END LOOP;
END $$;

-- Pin search_path on remaining functions missing it
ALTER FUNCTION public.set_updated_at() SET search_path = public;