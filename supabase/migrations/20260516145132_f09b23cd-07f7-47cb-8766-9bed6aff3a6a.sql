
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Public bucket already serves files via public URL; drop broad SELECT to prevent listing
DROP POLICY IF EXISTS "Anyone can view em-media" ON storage.objects;
