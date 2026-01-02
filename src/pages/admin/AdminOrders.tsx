import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, Mail, Calendar, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CustomOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  description: string;
  image_urls: string[];
  budget: string | null;
  occasion: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
}

export default function AdminOrders() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as CustomOrder[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('custom_orders').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Order status updated' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating order', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('custom_orders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Order deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting order', description: error.message, variant: 'destructive' });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Custom Orders</h1>
          <p className="text-muted-foreground">View and manage custom order requests</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : orders?.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">No custom orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders?.map((order) => (
              <div key={order.id} className="bg-card rounded-xl border border-border p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg text-foreground">{order.customer_name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="w-4 h-4" />
                        {order.customer_phone}
                      </a>
                      {order.customer_email && (
                        <a href={`mailto:${order.customer_email}`} className="flex items-center gap-1 hover:text-primary">
                          <Mail className="w-4 h-4" />
                          {order.customer_email}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.occasion && (
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          Occasion: {order.occasion}
                        </span>
                      )}
                      {order.budget && (
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          Budget: {order.budget}
                        </span>
                      )}
                      {order.deadline && (
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          Deadline: {new Date(order.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className="text-foreground bg-muted/50 p-3 rounded-lg text-sm">
                      {order.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <Select
                      value={order.status}
                      onValueChange={(status) => updateMutation.mutate({ id: order.id, status })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => deleteMutation.mutate(order.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
