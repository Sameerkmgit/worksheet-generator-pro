CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: grant_admin_role(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.grant_admin_role(user_email text) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Find the user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email
  LIMIT 1;

  IF target_user_id IS NULL THEN
    RETURN 'User not found';
  END IF;

  -- Insert admin role (or do nothing if already exists)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN 'Admin role granted successfully';
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_worksheets_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_worksheets_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    grade text NOT NULL,
    subject text NOT NULL,
    description text,
    icon text,
    image_url text,
    worksheet_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: worksheet_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.worksheet_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    grade text NOT NULL,
    subject text NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: worksheet_image_overrides; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.worksheet_image_overrides (
    worksheet_id text NOT NULL,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: worksheets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.worksheets (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    grade text NOT NULL,
    subject text NOT NULL,
    pdf_url text NOT NULL,
    image_url text,
    heading text,
    intro text,
    questions jsonb,
    skills text[],
    usage text,
    faq jsonb,
    seo jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_archived boolean DEFAULT false,
    content text,
    category_id uuid
);


--
-- Name: categories categories_grade_subject_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_grade_subject_key UNIQUE (grade, subject);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: worksheet_categories worksheet_categories_grade_subject_title_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_categories
    ADD CONSTRAINT worksheet_categories_grade_subject_title_key UNIQUE (grade, subject, title);


--
-- Name: worksheet_categories worksheet_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_categories
    ADD CONSTRAINT worksheet_categories_pkey PRIMARY KEY (id);


--
-- Name: worksheet_image_overrides worksheet_image_overrides_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_image_overrides
    ADD CONSTRAINT worksheet_image_overrides_pkey PRIMARY KEY (worksheet_id);


--
-- Name: worksheets worksheets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheets
    ADD CONSTRAINT worksheets_pkey PRIMARY KEY (id);


--
-- Name: idx_worksheet_categories_grade_subject; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheet_categories_grade_subject ON public.worksheet_categories USING btree (grade, subject);


--
-- Name: idx_worksheets_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheets_category_id ON public.worksheets USING btree (category_id);


--
-- Name: idx_worksheets_is_archived; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheets_is_archived ON public.worksheets USING btree (is_archived);


--
-- Name: categories update_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: worksheet_categories update_worksheet_categories_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_worksheet_categories_updated_at BEFORE UPDATE ON public.worksheet_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: worksheet_image_overrides update_worksheet_image_overrides_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_worksheet_image_overrides_updated_at BEFORE UPDATE ON public.worksheet_image_overrides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: worksheets update_worksheets_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_worksheets_updated_at BEFORE UPDATE ON public.worksheets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: worksheets update_worksheets_updated_at_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_worksheets_updated_at_trigger BEFORE UPDATE ON public.worksheets FOR EACH ROW EXECUTE FUNCTION public.update_worksheets_updated_at();


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: worksheet_image_overrides worksheet_image_overrides_worksheet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_image_overrides
    ADD CONSTRAINT worksheet_image_overrides_worksheet_id_fkey FOREIGN KEY (worksheet_id) REFERENCES public.worksheets(id) ON DELETE CASCADE;


--
-- Name: worksheets worksheets_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheets
    ADD CONSTRAINT worksheets_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.worksheet_categories(id) ON DELETE SET NULL;


--
-- Name: categories Admins can delete categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheet_categories Admins can delete worksheet categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete worksheet categories" ON public.worksheet_categories FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheets Admins can delete worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete worksheets" ON public.worksheets FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Admins can insert categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheet_categories Admins can insert worksheet categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert worksheet categories" ON public.worksheet_categories FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheets Admins can insert worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert worksheets" ON public.worksheets FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can manage all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all roles" ON public.user_roles USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheet_image_overrides Admins can manage image overrides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage image overrides" ON public.worksheet_image_overrides USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Admins can update categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheet_categories Admins can update worksheet categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update worksheet categories" ON public.worksheet_categories FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: worksheets Admins can update worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update worksheets" ON public.worksheets FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: categories Anyone can view categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);


--
-- Name: worksheet_image_overrides Anyone can view image overrides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view image overrides" ON public.worksheet_image_overrides FOR SELECT USING (true);


--
-- Name: worksheet_categories Anyone can view worksheet categories; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view worksheet categories" ON public.worksheet_categories FOR SELECT USING (true);


--
-- Name: worksheets Anyone can view worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view worksheets" ON public.worksheets FOR SELECT USING (true);


--
-- Name: profiles Deny anonymous access to profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Deny anonymous access to profiles" ON public.profiles FOR SELECT TO anon USING (false);


--
-- Name: user_roles Only admins can create role assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Only admins can create role assignments" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Only admins can delete role assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Only admins can delete role assignments" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Only admins can update role assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Only admins can update role assignments" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: profiles Users can create their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: profiles Users can delete their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING ((auth.uid() = id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: categories; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: worksheet_categories; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.worksheet_categories ENABLE ROW LEVEL SECURITY;

--
-- Name: worksheet_image_overrides; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.worksheet_image_overrides ENABLE ROW LEVEL SECURITY;

--
-- Name: worksheets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.worksheets ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


