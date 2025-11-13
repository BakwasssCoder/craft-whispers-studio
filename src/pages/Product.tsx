import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';

export default function Product() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Embroidered Wall Hanging',
    price: 1299,
    category: 'Fabric Art',
    description: 'Beautiful handcrafted wall hanging with intricate embroidery. Perfect for adding a touch of artisanal charm to any room. Each piece is unique and made with love.',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop',
    ],
    variants: ['Small (12x12)', 'Medium (18x18)', 'Large (24x24)'],
    details: [
      'Handcrafted with premium materials',
      'Ships within 5-10 business days',
      'Each piece is unique',
      'Made in India',
    ],
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-serif font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button key={variant} variant="outline">
                    {variant}
                  </Button>
                ))}
              </div>
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
              <Button variant="hero" size="lg" className="w-full">
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
                <Button variant="outline" size="icon" className="flex-1">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
