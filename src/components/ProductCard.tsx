import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, discountPrice, image, category }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasDiscount = discountPrice && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
      variant: category
    });
    toast.success('Added to cart!');
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>
      <CardContent className="p-3 md:p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 truncate">
          {category}
        </p>
        <Link to={`/product/${id}`}>
          <h3 className="font-serif text-sm md:text-lg font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-primary font-bold text-lg md:text-xl">₹{displayPrice}</p>
          {hasDiscount && (
            <p className="text-muted-foreground line-through text-sm">₹{price}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 md:p-4 pt-0">
        <Button 
          variant="hero" 
          size="sm" 
          className="w-full text-xs md:text-sm" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
