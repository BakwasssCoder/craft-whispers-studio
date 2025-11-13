import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface WhatsAppButtonProps {
  productName?: string;
  variant?: string;
  qty?: number;
  pincode?: string;
  buyerName?: string;
  buyerPhone?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  cartItems?: Array<{ id: string; name: string; price: number; quantity: number; variant: string }>;
}

export default function WhatsAppButton({ 
  productName = '', 
  variant = '', 
  qty = 1, 
  pincode = '', 
  buyerName = '', 
  buyerPhone = '',
  className = '',
  size = 'default',
  cartItems
}: WhatsAppButtonProps) {
  const { cartItems: contextCartItems } = useCart();
  const itemsToSend = cartItems || contextCartItems || [];
  
  const base = 'https://wa.me/916290127405';
  
  let text = '';
  
  if (itemsToSend.length > 0) {
    // Cart order message
    text = `Hello Subhangi Saha,

I would like to place an order for the following items:

`;
    
    itemsToSend.forEach((item, index) => {
      text += `${index + 1}. ${item.name}
   Variant: ${item.variant}
   Quantity: ${item.quantity}
   Price: ₹${item.price}
   Total: ₹${item.price * item.quantity}

`;
    });
    
    const subtotal = itemsToSend.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 99;
    const total = subtotal + shipping;
    
    text += `Subtotal: ₹${subtotal}
Shipping: ₹${shipping}
Total: ₹${total}

`;
    
    if (buyerName) text += `Name: ${buyerName}
`;
    if (buyerPhone) text += `Phone: ${buyerPhone}
`;
    if (pincode) text += `Delivery Pincode: ${pincode}
`;
    
    text += `Please confirm the order and provide payment instructions.`;
  } else {
    // Single product order message
    text = `Hello Subhangi Saha, I want to order: ${productName} (Variant: ${variant}) Qty: ${qty} Delivery pincode: ${pincode} Name: ${buyerName} Phone: ${buyerPhone}`;
  }
  
  const url = `${base}?text=${encodeURIComponent(text)}`;

  return (
    <Button 
      asChild
      variant="whatsapp"
      size={size}
      className={className}
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        Order via WhatsApp
      </a>
    </Button>
  );
}