-- Fix privilege escalation vulnerability by adding explicit INSERT policy
-- Only admins can insert new role assignments
CREATE POLICY "Only admins can create role assignments"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add explicit UPDATE policy - only admins can update roles
CREATE POLICY "Only admins can update role assignments"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add explicit DELETE policy - only admins can delete roles
CREATE POLICY "Only admins can delete role assignments"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix the has_role function to include proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Fix the grant_admin_role function to include proper search_path
CREATE OR REPLACE FUNCTION public.grant_admin_role(user_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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