import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Mail, Instagram, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '@/hooks/useSiteContent';
import { ContentSkeleton } from '@/components/skeletons/ContentSkeleton';
import { motion } from 'framer-motion';

export default function Contact() {
  const { data: contactContent, isLoading } = useSiteContent('contact');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <ContentSkeleton />
        </div>
      </div>
    );
  }

  const content = contactContent?.content || {};
  const email = content.email || 'sahasclout@gmail.com';
  const phone = content.phone || '+91 6290127405';
  const hours = content.hours || 'Mon-Sat: 10AM - 7PM IST';

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            {contactContent?.title || 'Get in Touch'}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            We'd love to hear from you. Reach out anytime!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-card p-6 md:p-8 rounded-2xl shadow-soft"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6">Contact Information</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{phone}</p>
                    <a
                      href="https://wa.me/916290127405"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      Chat with us →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">Email</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">Instagram</h3>
                    <a
                      href="https://instagram.com/sahasclout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary text-sm md:text-base"
                    >
                      @sahasclout
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">Location</h3>
                    <p className="text-muted-foreground text-sm md:text-base">Kolkata, West Bengal, India</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Ships across India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-5 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Business Hours</h3>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                WhatsApp messages are responded to within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
