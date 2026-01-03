-- Create support_messages table for contact form submissions
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Public can insert support messages (no auth required for contact form)
CREATE POLICY "Anyone can submit support messages"
ON public.support_messages
FOR INSERT
WITH CHECK (true);

-- Only admins can view support messages
CREATE POLICY "Admins can view support messages"
ON public.support_messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete support messages
CREATE POLICY "Admins can delete support messages"
ON public.support_messages
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));