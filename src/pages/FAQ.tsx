import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Orders typically ship within 5-10 business days across India. Custom orders may take 7-14 days depending on complexity.',
    },
    {
      question: 'Do you accept returns?',
      answer: 'Due to the handmade nature of our products, custom items are non-returnable. However, if there is a defect or damage during shipping, please contact us within 48 hours of delivery.',
    },
    {
      question: 'Can I customize a product?',
      answer: 'Absolutely! We love creating personalized pieces. Use our Custom Order page or message us on WhatsApp with your requirements.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept payments via UPI, bank transfer, and Razorpay (cards, net banking). For WhatsApp orders, payment details will be shared after confirmation.',
    },
    {
      question: 'Do you offer bulk orders for events?',
      answer: 'Yes! We can create bulk orders for weddings, corporate events, and special occasions. Message us on WhatsApp for bulk pricing and timelines.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking link via WhatsApp or email. You can also message us anytime for updates.',
    },
    {
      question: 'Are your products eco-friendly?',
      answer: 'We use sustainable materials wherever possible and minimize waste in our crafting process. Each piece is made to last and be cherished.',
    },
    {
      question: 'What if I need help choosing a product?',
      answer: 'Feel free to reach out on WhatsApp! I\'m happy to help you pick the perfect piece or create something custom for your needs.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our products and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-lg px-6 border-0 shadow-soft"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Message us on WhatsApp and we'll get back to you within 24 hours!
          </p>
          <a
            href="https://wa.me/916290127405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
