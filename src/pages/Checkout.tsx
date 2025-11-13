import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CreditCard } from 'lucide-react';

export default function Checkout() {
  const cartTotal = 4996;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-serif font-bold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="Pincode" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card p-6 rounded-lg shadow-soft">
              <h2 className="text-xl font-serif font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay with Razorpay (Cards, UPI, Net Banking)
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <WhatsAppButton
                  productName="Checkout Order"
                  qty={1}
                  className="w-full"
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow-soft sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{cartTotal - 99}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">₹99</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-primary">₹{cartTotal}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Shipping within 5-10 business days</p>
                <p>• Secure payment processing</p>
                <p>• WhatsApp order confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
