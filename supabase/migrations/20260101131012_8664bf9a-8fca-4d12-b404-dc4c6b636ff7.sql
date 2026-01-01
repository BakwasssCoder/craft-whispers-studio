-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Custom orders table
CREATE TABLE public.custom_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  description TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  budget TEXT,
  occasion TEXT,
  deadline DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ items table
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site content table (for About, Contact, etc.)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hero banners table
CREATE TABLE public.hero_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables
CREATE POLICY "Anyone can read active categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read active announcements" ON public.announcements FOR SELECT USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));
CREATE POLICY "Anyone can read active gallery images" ON public.gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read active FAQ items" ON public.faq_items FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can read active hero banners" ON public.hero_banners FOR SELECT USING (is_active = true);

-- Anyone can submit custom orders
CREATE POLICY "Anyone can submit custom orders" ON public.custom_orders FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- Insert seed data for categories
INSERT INTO public.categories (name, slug, description, display_order) VALUES
('Love Hampers', 'love-hampers', 'Curated gift hampers for your loved ones', 1),
('Handmade Jewelry', 'handmade-jewelry', 'Unique handcrafted jewelry pieces', 2),
('Fabric Art', 'fabric-art', 'Beautiful fabric art and embroidery', 3),
('Custom Gifts', 'custom-gifts', 'Personalized gifts for special occasions', 4);

-- Insert seed products
INSERT INTO public.products (name, slug, description, price, discount_price, category_id, images, is_featured, display_order) VALUES
('Valentine Love Hamper', 'valentine-love-hamper', 'A beautiful curated hamper with chocolates, flowers, and handmade cards perfect for Valentine''s Day', 1499, 1299, (SELECT id FROM public.categories WHERE slug = 'love-hampers'), ARRAY['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'], true, 1),
('Handcrafted Pearl Necklace', 'handcrafted-pearl-necklace', 'Elegant pearl necklace handmade with love and attention to detail', 899, NULL, (SELECT id FROM public.categories WHERE slug = 'handmade-jewelry'), ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'], true, 2),
('Embroidered Wall Art', 'embroidered-wall-art', 'Beautiful hand-embroidered wall art that adds charm to any room', 1299, NULL, (SELECT id FROM public.categories WHERE slug = 'fabric-art'), ARRAY['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800'], true, 3),
('Birthday Surprise Box', 'birthday-surprise-box', 'Complete birthday celebration kit with decorations, treats, and gifts', 1999, 1799, (SELECT id FROM public.categories WHERE slug = 'custom-gifts'), ARRAY['https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800'], true, 4),
('Friendship Bracelet Set', 'friendship-bracelet-set', 'Set of matching handmade friendship bracelets', 499, NULL, (SELECT id FROM public.categories WHERE slug = 'handmade-jewelry'), ARRAY['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'], false, 5),
('Anniversary Gift Basket', 'anniversary-gift-basket', 'Romantic anniversary hamper with premium items', 2499, 2199, (SELECT id FROM public.categories WHERE slug = 'love-hampers'), ARRAY['https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800'], true, 6);

-- Insert seed announcement
INSERT INTO public.announcements (message, link_url, link_text, is_active) VALUES
('New Love Hampers Launched 💝 | Limited Time Offer - 15% Off!', '/shop?category=love-hampers', 'Shop Now', true);

-- Insert seed hero banner
INSERT INTO public.hero_banners (title, subtitle, image_url, cta_text, cta_link, is_active) VALUES
('Handmade Gifts Made with Love', 'Shop fabric art, custom hampers & handcrafted jewelry. Order quickly via WhatsApp.', 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1920', 'Explore Collection', '/shop', true);

-- Insert seed FAQ items
INSERT INTO public.faq_items (question, answer, category, display_order) VALUES
('How long does shipping take?', 'Standard shipping takes 5-10 business days across India. Express shipping is available for select locations.', 'Shipping', 1),
('Can I return custom items?', 'Custom and personalized items are non-returnable. Standard items can be returned within 7 days if unused.', 'Returns', 2),
('Do you offer bulk orders?', 'Yes! We offer special pricing for bulk orders. Message us on WhatsApp for custom quotes.', 'Orders', 3),
('How do I track my order?', 'Once your order ships, you''ll receive a tracking link via WhatsApp and email.', 'Shipping', 4);

-- Insert seed site content
INSERT INTO public.site_content (page_key, title, content) VALUES
('about', 'About Sahas Clout', '{"story": "I''m Subhangi Saha — I craft small-batch items with care. Each order is packed by hand and shipped across India. My journey started with a simple belief: handmade gifts carry more love and meaning than anything mass-produced.", "mission": "To bring joy through handcrafted, personalized gifts that create lasting memories.", "values": ["Handmade with love", "Quality materials", "Personal attention to every order", "Sustainable practices"]}'),
('contact', 'Get in Touch', '{"email": "hello@sahasclout.com", "phone": "+91 6290127405", "address": "Kolkata, West Bengal, India", "hours": "Mon-Sat: 10AM - 7PM IST"}');

-- Insert seed gallery images
INSERT INTO public.gallery_images (image_url, title, description, display_order) VALUES
('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', 'Love Hamper Collection', 'Our bestselling gift hampers', 1),
('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'Handcrafted Jewelry', 'Unique pieces made with love', 2),
('https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800', 'Fabric Art', 'Beautiful embroidery work', 3),
('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800', 'Custom Gifts', 'Personalized creations', 4);