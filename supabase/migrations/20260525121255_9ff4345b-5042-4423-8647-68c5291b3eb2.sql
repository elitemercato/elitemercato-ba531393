CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_role public.app_role;
  v_role_text TEXT;
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', '')
  )
  ON CONFLICT (user_id) DO NOTHING;

  v_role_text := COALESCE(NEW.raw_user_meta_data ->> 'role', 'user');
  BEGIN
    v_role := v_role_text::public.app_role;
  EXCEPTION WHEN invalid_text_representation THEN
    v_role := 'user'::public.app_role;
  END;

  -- Whitelist: never allow self-assigning 'admin' or any non-signup role via metadata
  IF v_role NOT IN ('player'::public.app_role, 'club'::public.app_role, 'coach'::public.app_role, 'technician'::public.app_role) THEN
    v_role := 'user'::public.app_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, v_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;