import { Heart, Package, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About saha's Clout
          </h1>
          <p className="text-muted-foreground text-lg">
            Handcrafted stories, one piece at a time
          </p>
        </div>

        {/* Our Mission */}
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            Create personalized gifts to show your love and appreciation for your friends and family.
          </p>
          
          <p>
            To do so, we collaborate with local artisans who care about quality and craft their pieces with passion.
          </p>
        </div>

        {/* The Embroidery Experience */}
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground">The Embroidery Experience</h2>
          <p className="text-xl leading-relaxed">
            From custom designs to your door, discover how we create unique embroidery pieces that bring joy to your life.
          </p>
        </div>

        {/* Our Creations */}
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground">Our Creations</h2>
          <p className="text-xl leading-relaxed">
            Explore our handcrafted embroidery designs, each meticulously crafted to convey beauty, elegance, and a touch of artistry.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <img 
                src="https://stitched-with-love2.odoo.com/html_editor/image_shape/website.s_text_image_default_image/html_builder/solid/solid_blob_shadow_2.svg?c2=o-color-2" 
                alt="Our Creations" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <img 
                src="https://stitched-with-love2.odoo.com/html_editor/image_shape/website.s_image_text_default_image/html_builder/composition/composition_mixed_1.svg?c1=o-color-2&c2=o-color-2&c5=o-color-5" 
                alt="Our Creations" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
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