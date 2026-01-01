import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Sparkles, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitCustomOrder } from '@/hooks/useCustomOrders';
import { motion } from 'framer-motion';

export default function CustomOrder() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    budget: '',
    occasion: '',
    deadline: '',
  });

  const submitOrder = useSubmitCustomOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to database
      await submitOrder.mutateAsync({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || undefined,
        description: formData.description,
        budget: formData.budget || undefined,
        occasion: formData.occasion || undefined,
        deadline: formData.deadline || undefined,
      });

      // Create WhatsApp message
      const message = `Custom Order Request:
Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.occasion ? `Occasion: ${formData.occasion}` : ''}
${formData.budget ? `Budget: ${formData.budget}` : ''}
${formData.deadline ? `Deadline: ${formData.deadline}` : ''}

Description:
${formData.description}`;
      
      const url = `https://wa.me/916290127405?text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
      toast.success('Order submitted! Opening WhatsApp...');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        description: '',
        budget: '',
        occasion: '',
        deadline: '',
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const occasions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Valentine\'s Day',
    'Mother\'s Day',
    'Festival',
    'Corporate Gift',
    'Other'
  ];

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-secondary mx-auto mb-3 md:mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            Custom Order
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Want it personalized? Share your vision and Subhangi will create something special just for you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5 md:space-y-6 bg-card p-6 md:p-8 rounded-2xl shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address (Optional)</Label>
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
              <Label htmlFor="occasion">Occasion</Label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select an occasion</option>
                {occasions.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., ₹500-1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">When do you need it?</Label>
              <div className="relative">
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Describe Your Vision *</Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your custom order. Include colors, size, style preferences, and any special requests..."
              rows={6}
            />
          </div>

          {/* File Upload Placeholder */}
          <div className="space-y-2">
            <Label>Upload Reference Images (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB (Coming soon)
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">What Happens Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                Subhangi will review your request on WhatsApp
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                You'll receive a price estimate within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                Once approved, your custom piece will be crafted
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">•</span>
                Typical turnaround: 7-14 business days
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            variant="gold" 
            size="lg" 
            className="w-full"
            disabled={submitOrder.isPending}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {submitOrder.isPending ? 'Submitting...' : 'Submit Request via WhatsApp'}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
