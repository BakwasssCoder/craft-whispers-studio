import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const shippingText = "Calculated at checkout based on delivery location (PAN India Delivery)";

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Button asChild variant="hero">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg p-4 flex gap-4 shadow-soft"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.variant}</p>
                    <p className="text-primary font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-soft sticky top-24">
                <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-sm">{shippingText}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl text-primary">₹{subtotal}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <WhatsAppButton
                    cartItems={cartItems}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}