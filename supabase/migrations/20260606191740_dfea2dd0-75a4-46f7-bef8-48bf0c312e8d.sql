-- 1. Hide archived worksheets from the public
DROP POLICY IF EXISTS "Anyone can view worksheets" ON public.worksheets;
CREATE POLICY "Anyone can view active worksheets"
ON public.worksheets
FOR SELECT
USING ((is_archived = false) OR has_role(auth.uid(), 'admin'::app_role));

-- 2. Admin write policies for worksheet_packs
CREATE POLICY "Admins can insert worksheet packs"
ON public.worksheet_packs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update worksheet packs"
ON public.worksheet_packs
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete worksheet packs"
ON public.worksheet_packs
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Remove public/anon execute on the sensitive admin-granting function
REVOKE EXECUTE ON FUNCTION public.grant_admin_role(text) FROM anon, authenticated, public;