import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Sparkles, Heart, Package } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useHeroBanners } from '@/hooks/useHeroBanners';
import { useGalleryImages } from '@/hooks/useGallery';
import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton';

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { data: featuredProducts, isLoading: productsLoading } = useFeaturedProducts();
  const { data: heroBanners, isLoading: heroLoading } = useHeroBanners();
  const { data: galleryImages } = useGalleryImages();

  const activeBanner = heroBanners?.find(b => b.is_active);
  const displayGallery = galleryImages?.slice(0, 3) || [];

  if (heroLoading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative h-[85vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          {activeBanner && (
            <img
              src={activeBanner.image_url}
              alt="Handmade crafts"
              className="w-full h-full object-cover scale-110"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center px-4"
          style={{ y: textY, opacity }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {activeBanner?.title.split(' ').slice(0, 2).join(' ')}<br />
            <span className="text-primary">{activeBanner?.title.split(' ').slice(2).join(' ') || 'Made with Love'}</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {activeBanner?.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
              <Link to={activeBanner?.cta_link || '/shop'} className="gap-2">
                {activeBanner?.cta_text || 'Shop Now'}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
              <Link to="/custom-order" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Custom Order
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features with Scroll Animation */}
      <motion.section
        className="py-12 md:py-16 bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Heart, title: 'Handcrafted with Love', desc: 'Each piece is made with care and attention to detail', color: 'primary' },
              { icon: Sparkles, title: 'Custom Creations', desc: 'Personalize your gifts exactly how you want them', color: 'secondary' },
              { icon: Package, title: 'Fast Delivery', desc: 'Shipped across India within 5-10 business days', color: 'accent' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center space-y-3 md:space-y-4 p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-serif font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products with Scroll Animation */}
      <motion.section
        className="py-12 md:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Discover our handpicked selection of unique pieces
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : (
              featuredProducts?.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProductCard 
                    id={product.slug}
                    name={product.name}
                    price={Number(product.price)}
                    image={product.images?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
                    category={product.category?.name || 'Handmade'}
                  />
                </motion.div>
              ))
            )}
          </div>
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Preview */}
      {displayGallery.length > 0 && (
        <motion.section
          className="py-12 md:py-20 bg-gradient-to-br from-background to-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
                Our Creations
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Explore our handcrafted designs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {displayGallery.map((image, idx) => (
                <motion.div 
                  key={image.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-square"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={image.image_url} 
                    alt={image.title || 'Gallery image'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-background font-medium">{image.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline">
                <Link to="/gallery">View Full Gallery</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Custom Order CTA with Scroll Animation */}
      <motion.section
        className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-secondary mx-auto mb-4 md:mb-6" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Want it Personalized?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Upload your photo and note — Subhangi will reply on WhatsApp within 24 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
              <Link to="/custom-order">
                Start Custom Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
