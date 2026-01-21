-- Fix security: Add SELECT policy for custom_orders (currently missing)
-- The table already has admin policies for DELETE, UPDATE but SELECT uses has_role which is correct
-- Let's verify and ensure proper restrictive SELECT policy exists

-- Drop the existing SELECT policy if it exists and recreate properly
DROP POLICY IF EXISTS "Admins can read custom_orders" ON public.custom_orders;

CREATE POLICY "Admins can read custom_orders"
ON public.custom_orders
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads', 
  'uploads', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for uploads bucket
CREATE POLICY "Anyone can view uploads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'uploads');

CREATE POLICY "Admins can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'uploads' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update uploads"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'uploads' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'uploads' 
  AND has_role(auth.uid(), 'admin'::app_role)
);