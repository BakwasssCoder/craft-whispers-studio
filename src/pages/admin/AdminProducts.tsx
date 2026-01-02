import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  category_id: string | null;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

export default function AdminProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Product[];
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

  const createMutation = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const { error } = await supabase.from('products').insert([product]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product created successfully' });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating product', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const { error } = await supabase.from('products').update(product).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product updated successfully' });
      setIsOpen(false);
      setEditingProduct(null);
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imagesStr = formData.get('images') as string;
    
    const product = {
      name: formData.get('name') as string,
      slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string || null,
      price: parseFloat(formData.get('price') as string),
      discount_price: formData.get('discount_price') ? parseFloat(formData.get('discount_price') as string) : null,
      category_id: formData.get('category_id') as string || null,
      images: imagesStr ? imagesStr.split(',').map(s => s.trim()) : [],
      is_featured: formData.get('is_featured') === 'on',
      is_active: formData.get('is_active') === 'on',
      display_order: parseInt(formData.get('display_order') as string) || 0,
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, ...product });
    } else {
      createMutation.mutate(product);
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setIsOpen(true); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount_price">Discount Price (₹)</Label>
                    <Input id="discount_price" name="discount_price" type="number" step="0.01" defaultValue={editingProduct?.discount_price || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select name="category_id" defaultValue={editingProduct?.category_id || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingProduct?.description || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Image URLs (comma separated)</Label>
                  <Textarea id="images" name="images" defaultValue={editingProduct?.images.join(', ') || ''} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input id="display_order" name="display_order" type="number" defaultValue={editingProduct?.display_order || 0} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch id="is_featured" name="is_featured" defaultChecked={editingProduct?.is_featured} />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch id="is_active" name="is_active" defaultChecked={editingProduct?.is_active ?? true} />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingProduct ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {product.discount_price ? (
                        <span>
                          <span className="line-through text-muted-foreground">₹{product.price}</span>
                          <span className="ml-2 text-primary">₹{product.discount_price}</span>
                        </span>
                      ) : (
                        <span>₹{product.price}</span>
                      )}
                    </TableCell>
                    <TableCell>{product.is_featured ? '⭐' : '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(product.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
