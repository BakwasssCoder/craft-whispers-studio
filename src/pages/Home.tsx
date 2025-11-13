import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Sparkles, Heart, Package } from 'lucide-react';
import heroImage from '@/assets/hero-crafts.jpg';

export default function Home() {
  // Mock featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Embroidered Wall Hanging',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      category: 'Fabric Art',
    },
    {
      id: '2',
      name: 'Custom Gift Hamper',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop',
      category: 'Hampers',
    },
    {
      id: '3',
      name: 'Handcrafted Jewelry Set',
      price: 899,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      category: 'Jewelry',
    },
    {
      id: '4',
      name: 'Fabric Coasters Set',
      price: 449,
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&h=500&fit=crop',
      category: 'Home Decor',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Handmade crafts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Handmade Gifts<br />
            <span className="text-primary">Made with Love</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Shop fabric art, custom hampers & handcrafted jewelry.<br />
            Order quickly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 animate-slide-up">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold">Handcrafted with Love</h3>
              <p className="text-muted-foreground">
                Each piece is made with care and attention to detail
              </p>
            </div>
            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-serif font-semibold">Custom Creations</h3>
              <p className="text-muted-foreground">
                Personalize your gifts exactly how you want them
              </p>
            </div>
            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Shipped across India within 5-10 business days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Collections
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our handpicked selection of unique pieces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-12 w-12 text-secondary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Want it Personalized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your photo and note — Subhangi will reply on WhatsApp within 24 hours.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/custom-order">
              Start Custom Order
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
