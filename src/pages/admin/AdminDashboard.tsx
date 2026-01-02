import { useProducts } from '@/hooks/useProducts';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useGalleryImages } from '@/hooks/useGallery';
import { useFaqItems } from '@/hooks/useFaq';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Package, Megaphone, Image, HelpCircle, ShoppingBag, FolderOpen } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { data: products } = useProducts();
  const { data: announcements } = useAnnouncements();
  const { data: gallery } = useGalleryImages();
  const { data: faqs } = useFaqItems();
  
  const { data: orders } = useQuery({
    queryKey: ['admin-custom-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    { label: 'Products', value: products?.length || 0, icon: Package, path: '/admin/products', color: 'bg-primary/10 text-primary' },
    { label: 'Categories', value: categories?.length || 0, icon: FolderOpen, path: '/admin/categories', color: 'bg-secondary/10 text-secondary' },
    { label: 'Announcements', value: announcements?.length || 0, icon: Megaphone, path: '/admin/announcements', color: 'bg-accent/10 text-accent' },
    { label: 'Gallery Images', value: gallery?.length || 0, icon: Image, path: '/admin/gallery', color: 'bg-primary/10 text-primary' },
    { label: 'FAQ Items', value: faqs?.length || 0, icon: HelpCircle, path: '/admin/faq', color: 'bg-secondary/10 text-secondary' },
    { label: 'Custom Orders', value: orders?.length || 0, icon: ShoppingBag, path: '/admin/orders', color: 'bg-accent/10 text-accent' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your store content</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.path}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Custom Orders</h2>
          {orders && orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.occasion || 'Custom Order'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No custom orders yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
