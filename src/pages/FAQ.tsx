import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFaqItems } from '@/hooks/useFaq';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export default function FAQ() {
  const { data: faqItems, isLoading } = useFaqItems();

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Everything you need to know about our products and services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqItems?.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-card rounded-lg px-4 md:px-6 border-0 shadow-soft"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-sm md:text-base">
                    <span className="font-semibold pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}

        {!isLoading && faqItems?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No FAQs available yet.</p>
          </div>
        )}

        {/* Contact CTA */}
        <motion.div 
          className="mt-10 md:mt-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
            Message us on WhatsApp and we'll get back to you within 24 hours!
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
