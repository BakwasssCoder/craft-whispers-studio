import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Embroidered Wall Hanging',
    price: 1299,
    category: 'Fabric Art',
    description: 'Beautiful handcrafted wall hanging with intricate embroidery. Perfect for adding a touch of artisanal charm to any room. Each piece is unique and made with love.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop',
    variants: ['Small (12x12)', 'Medium (18x18)', 'Large (24x24)'],
    details: [
      'Handcrafted with premium materials',
      'Ships within 5-10 business days',
      'Each piece is unique',
      'Made in India',
    ],
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: 'Medium (18x18)'
    });
    toast.success('Item added to cart!');
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    toast.success(
      isFavorite(product.id) 
        ? 'Removed from favorites!' 
        : 'Added to favorites!'
    );
  };

  const handleShare = async () => {
    const url = window.location.origin + location.pathname;
    const text = `Check out this amazing product: ${product.name} - ₹${product.price}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  const isFav = isFavorite(product.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden bg-muted rounded-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <h1 className="text-3xl font-serif font-bold mt-1">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mt-2">₹{product.price}</p>
            </div>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            {/* Details */}
            <div>
              <h3 className="font-semibold mb-2">Details</h3>
              <ul className="space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="hero" size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <WhatsAppButton
                productName={product.name}
                variant="Medium (18x18)"
                qty={quantity}
                className="w-full"
                size="lg"
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-1"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}