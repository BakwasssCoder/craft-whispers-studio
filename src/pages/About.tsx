import { Heart, Package, Sparkles } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';
import { ContentSkeleton } from '@/components/skeletons/ContentSkeleton';
import { motion } from 'framer-motion';

export default function About() {
  const { data: aboutContent, isLoading } = useSiteContent('about');

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <ContentSkeleton />
        </div>
      </div>
    );
  }

  const content = aboutContent?.content || {};
  const story = content.story || "I'm Subhangi Saha — I craft small-batch items with care. Each order is packed by hand and shipped across India.";
  const mission = content.mission || "To bring joy through handcrafted, personalized gifts that create lasting memories.";
  const values = content.values || ["Handmade with love", "Quality materials", "Personal attention to every order"];

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            {aboutContent?.title || "About Saha's Clout"}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Handcrafted stories, one piece at a time
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-muted-foreground mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Our Story</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            {story}
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="prose prose-lg max-w-none space-y-4 md:space-y-6 text-muted-foreground mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            {mission}
          </p>
        </motion.div>

        {/* Values */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { icon: Heart, title: 'Made with Love', desc: values[0] || 'Each piece is crafted by hand with attention to every detail' },
            { icon: Sparkles, title: 'Unique Designs', desc: values[1] || 'No mass production — every item is one-of-a-kind' },
            { icon: Package, title: 'Packed with Care', desc: values[2] || 'Each order is beautifully packaged and shipped across India' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="text-center space-y-3 md:space-y-4 p-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <item.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-serif font-semibold">{item.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-12 md:mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
            I'd love to hear from you! Reach out on WhatsApp for any queries about 
            products, custom orders, or bulk inquiries.
          </p>
          <a
            href="https://wa.me/916290127405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
