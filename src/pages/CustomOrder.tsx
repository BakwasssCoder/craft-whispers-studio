import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function CustomOrder() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productType: '',
    description: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Custom Order Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProduct Type: ${formData.productType}\nDescription: ${formData.description}\nDelivery Pincode: ${formData.pincode}`;
    const url = `https://wa.me/916290127405?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    toast.success('Opening WhatsApp to complete your custom order!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Sparkles className="h-12 w-12 text-secondary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Custom Order
          </h1>
          <p className="text-muted-foreground text-lg">
            Want it personalized? Share your vision and Subhangi will create something special just for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productType">Product Type *</Label>
            <Input
              id="productType"
              name="productType"
              required
              value={formData.productType}
              onChange={handleChange}
              placeholder="e.g., Custom Gift Hamper, Embroidered Art, Jewelry"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Describe Your Vision *</Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your custom order. Include colors, size, occasion, and any special requests..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Delivery Pincode *</Label>
            <Input
              id="pincode"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload Reference Images (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
              <input type="file" className="hidden" accept="image/*" multiple />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">What Happens Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Subhangi will review your request on WhatsApp</li>
              <li>• You'll receive a price estimate within 24 hours</li>
              <li>• Once approved, your custom piece will be crafted</li>
              <li>• Typical turnaround: 7-14 business days</li>
            </ul>
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full">
            <Sparkles className="mr-2 h-5 w-5" />
            Submit Request via WhatsApp
          </Button>
        </form>
      </div>
    </div>
  );
}
