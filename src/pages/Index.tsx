import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Sparkles, Heart, Package } from 'lucide-react';
import heroImage from '@/assets/hero-crafts.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // New featured products based on user's request
  const featuredProducts = [
    {
      id: '1',
      name: 'Earings',
      price: 59,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/2/image_1024/Earings?unique=bf9ba13',
      category: 'Earings',
    },
    {
      id: '2',
      name: 'Custom Hijab Design',
      price: 800,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/6/image_1024/Custom%20Hijab%20Design?unique=b46a5d9',
      category: 'Hijab',
    },
    {
      id: '3',
      name: 'Leaf style brooches',
      price: 200,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/7/image_1024/Leaf%20style%20brooches?unique=d62a7d8',
      category: 'Jewellery',
    },
    {
      id: '4',
      name: 'Embroidery hijab',
      price: 1900,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/13/image_1024/Embroidery%20hijab?unique=d86ef6c',
      category: 'Hijab',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <img
            src={heroImage}
            alt="Handmade crafts"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center px-4"
          style={{ y: textY, opacity }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Handmade Gifts<br />
            <span className="text-primary">Made with Love</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Shop fabric art, custom hampers & handcrafted jewelry.<br />
            Order quickly via WhatsApp.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Button asChild variant="hero" size="lg">
              <Link to="/shop" className="gap-2">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="gold" size="lg">
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
        className="py-16 bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Handcrafted with Love', desc: 'Each piece is made with care and attention to detail', color: 'primary' },
              { icon: Sparkles, title: 'Custom Creations', desc: 'Personalize your gifts exactly how you want them', color: 'secondary' },
              { icon: Package, title: 'Fast Delivery', desc: 'Shipped across India within 5-10 business days', color: 'accent' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                </motion.div>
                <h3 className="text-xl font-serif font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products with Scroll Animation */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our handpicked selection of unique pieces
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
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

      {/* Wow Effect Images */}
      <motion.section
        className="py-20 bg-gradient-to-br from-background to-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Creations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our handcrafted embroidery designs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="https://stitched-with-love2.odoo.com/html_editor/image_shape/website.s_image_text_default_image/html_builder/composition/composition_mixed_1.svg?c1=o-color-2&c2=o-color-2&c5=o-color-5" 
                alt="Our Creations" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://stitched-with-love2.odoo.com/web/image/1052-a3139396/name.webp" 
                alt="Our Work" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="https://stitched-with-love2.odoo.com/web/image/website.library_image_10" 
                alt="Our Collection" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Custom Order CTA with Scroll Animation */}
      <motion.section
        className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
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
            <Sparkles className="h-12 w-12 text-secondary mx-auto mb-6" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Want it Personalized?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
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
            <Button asChild variant="gold" size="lg">
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