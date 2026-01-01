import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';
import { useProduct } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import Lightbox from '@/components/Lightbox';
import { motion, AnimatePresence } from 'framer-motion';

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data: product, isLoading } = useProduct(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/shop">Back to Shop</a>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: images[0],
      variant: product.category?.name || 'Standard'
    });
    toast.success('Item added to cart!');
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: images[0],
      category: product.category?.name || 'Handmade'
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isFav = isFavorite(product.id);
  const displayPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && Number(product.discount_price) < Number(product.price);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div 
              className="aspect-square overflow-hidden bg-muted rounded-2xl relative cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-sm text-muted-foreground">{product.category?.name}</span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-xl md:text-2xl font-bold text-primary">₹{displayPrice}</p>
                {hasDiscount && (
                  <p className="text-lg text-muted-foreground line-through">₹{product.price}</p>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base">
              {product.description}
            </p>

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
            <div className="space-y-3 pt-4">
              <Button variant="hero" size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <WhatsAppButton
                productName={product.name}
                variant={product.category?.name || 'Standard'}
                qty={quantity}
                className="w-full"
                size="lg"
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-1 h-12"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-1 h-12"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Handcrafted with premium materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Ships within 5-10 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Each piece is unique
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Made in India with love
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
