
CREATE OR REPLACE FUNCTION public.enforce_lowercase_subject()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.subject := lower(NEW.subject);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enforce_lowercase_subject
BEFORE INSERT OR UPDATE ON public.worksheets
FOR EACH ROW
EXECUTE FUNCTION public.enforce_lowercase_subject();
