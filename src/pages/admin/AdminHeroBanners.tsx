import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ImageUpload from '@/components/admin/ImageUpload';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
  display_order: number;
}

export default function AdminHeroBanners() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<HeroBanner | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: banners, isLoading } = useQuery({
    queryKey: ['admin-hero-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as HeroBanner[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<HeroBanner, 'id'>) => {
      const { error } = await supabase.from('hero_banners').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-banners'] });
      queryClient.invalidateQueries({ queryKey: ['hero-banners'] });
      toast({ title: 'Hero banner created successfully' });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating banner', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...item }: HeroBanner) => {
      const { error } = await supabase.from('hero_banners').update(item).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-banners'] });
      queryClient.invalidateQueries({ queryKey: ['hero-banners'] });
      toast({ title: 'Hero banner updated successfully' });
      closeDialog();
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating banner', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('hero_banners').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hero-banners'] });
      queryClient.invalidateQueries({ queryKey: ['hero-banners'] });
      toast({ title: 'Hero banner deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting banner', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!imageUrl) {
      toast({ title: 'Image required', description: 'Please upload or enter an image URL', variant: 'destructive' });
      return;
    }

    const item = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string || null,
      image_url: imageUrl,
      cta_text: formData.get('cta_text') as string || null,
      cta_link: formData.get('cta_link') as string || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: formData.get('is_active') === 'on',
    };

    if (editing) {
      updateMutation.mutate({ id: editing.id, ...item });
    } else {
      createMutation.mutate(item);
    }
  };

  const openEditDialog = (item: HeroBanner) => {
    setEditing(item);
    setImageUrl(item.image_url);
    setIsOpen(true);
  };

  const openCreateDialog = () => {
    setEditing(null);
    setImageUrl('');
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditing(null);
    setImageUrl('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hero Banners</h1>
            <p className="text-muted-foreground">Manage homepage hero banners</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeDialog(); else openCreateDialog(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={editing?.title} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input id="subtitle" name="subtitle" defaultValue={editing?.subtitle || ''} />
                </div>
                
                <ImageUpload 
                  value={imageUrl} 
                  onChange={setImageUrl} 
                  label="Banner Image"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cta_text">Button Text</Label>
                    <Input id="cta_text" name="cta_text" defaultValue={editing?.cta_text || ''} placeholder="Shop Now" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta_link">Button Link</Label>
                    <Input id="cta_link" name="cta_link" defaultValue={editing?.cta_link || ''} placeholder="/shop" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input id="display_order" name="display_order" type="number" defaultValue={editing?.display_order || 0} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch id="is_active" name="is_active" defaultChecked={editing?.is_active ?? true} />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editing ? 'Update' : 'Create'}
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
                  <TableHead>Title</TableHead>
                  <TableHead>CTA</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={item.image_url} alt={item.title} className="w-20 h-12 object-cover rounded-lg" />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.cta_text || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
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
