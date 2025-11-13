import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
  variant?: string;
  qty?: number;
  pincode?: string;
  buyerName?: string;
  buyerPhone?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function WhatsAppButton({ 
  productName = '', 
  variant = '', 
  qty = 1, 
  pincode = '', 
  buyerName = '', 
  buyerPhone = '',
  className = '',
  size = 'default'
}: WhatsAppButtonProps) {
  const base = 'https://wa.me/916290127405';
  const text = `Hello Subhangi Saha, I want to order: ${productName} (Variant: ${variant}) Qty: ${qty} Delivery pincode: ${pincode} Name: ${buyerName} Phone: ${buyerPhone}`;
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
