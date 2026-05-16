
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table (separate from profiles to prevent privilege escalation)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- PLAYERS
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INT,
  position TEXT,
  club TEXT,
  nationality TEXT,
  preferred_foot TEXT,
  height_cm INT,
  market_value_eur BIGINT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER players_updated BEFORE UPDATE ON public.players
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Players are publicly readable"
  ON public.players FOR SELECT USING (true);
CREATE POLICY "Admins manage players"
  ON public.players FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- CLUBS
CREATE TABLE public.clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT,
  league TEXT,
  founded_year INT,
  stadium TEXT,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER clubs_updated BEFORE UPDATE ON public.clubs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Clubs are publicly readable"
  ON public.clubs FOR SELECT USING (true);
CREATE POLICY "Admins manage clubs"
  ON public.clubs FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- COACHES
CREATE TABLE public.coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INT,
  nationality TEXT,
  specialty TEXT,
  experience_years INT,
  current_club TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER coaches_updated BEFORE UPDATE ON public.coaches
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Coaches are publicly readable"
  ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Admins manage coaches"
  ON public.coaches FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- TECHNICIANS
CREATE TABLE public.technicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT,
  experience_years INT,
  certifications TEXT,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER technicians_updated BEFORE UPDATE ON public.technicians
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Technicians are publicly readable"
  ON public.technicians FOR SELECT USING (true);
CREATE POLICY "Admins manage technicians"
  ON public.technicians FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for media (player photos, club logos, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('em-media', 'em-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view em-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'em-media');

CREATE POLICY "Admins upload em-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'em-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update em-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'em-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete em-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'em-media' AND public.has_role(auth.uid(), 'admin'));
