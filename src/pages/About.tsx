import { Heart, Package, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About .sahasclout
          </h1>
          <p className="text-muted-foreground text-lg">
            Handcrafted stories, one piece at a time
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-xl leading-relaxed">
            Hi, I'm <span className="font-semibold text-foreground">Subhangi Saha</span> — 
            the heart and hands behind .sahasclout. I craft small-batch items with care, 
            turning fabric, thread, and imagination into pieces that tell a story.
          </p>

          <p>
            Every product you see here is handmade by me in my studio. From embroidered 
            wall hangings to custom gift hampers and handcrafted jewelry, each piece carries 
            the warmth of handwork and the uniqueness that only handmade items can offer.
          </p>

          <p>
            What started as a passion project has grown into a small business that celebrates 
            the beauty of slow, intentional craftsmanship. I believe in creating meaningful 
            gifts that connect people and carry emotions — whether it's a birthday surprise, 
            a wedding gift, or a piece of art for your home.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-semibold">Made with Love</h3>
            <p className="text-sm text-muted-foreground">
              Each piece is crafted by hand with attention to every detail
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-serif font-semibold">Unique Designs</h3>
            <p className="text-sm text-muted-foreground">
              No mass production — every item is one-of-a-kind
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Package className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif font-semibold">Packed with Care</h3>
            <p className="text-sm text-muted-foreground">
              Each order is beautifully packaged and shipped across India
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            I'd love to hear from you! Reach out on WhatsApp for any queries about 
            products, custom orders, or bulk inquiries.
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
