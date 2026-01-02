import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Announcement {
  id: string;
  message: string;
  link_url: string | null;
  link_text: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  display_order: number;
}

export default function AdminAnnouncements() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Announcement[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<Announcement, 'id'>) => {
      const { error } = await supabase.from('announcements').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Announcement created successfully' });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating announcement', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...item }: Announcement) => {
      const { error } = await supabase.from('announcements').update(item).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Announcement updated successfully' });
      setIsOpen(false);
      setEditing(null);
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating announcement', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Announcement deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting announcement', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const item = {
      message: formData.get('message') as string,
      link_url: formData.get('link_url') as string || null,
      link_text: formData.get('link_text') as string || null,
      start_date: formData.get('start_date') as string || null,
      end_date: formData.get('end_date') as string || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: formData.get('is_active') === 'on',
    };

    if (editing) {
      updateMutation.mutate({ id: editing.id, ...item });
    } else {
      createMutation.mutate(item);
    }
  };

  const openEditDialog = (item: Announcement) => {
    setEditing(item);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditing(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
            <p className="text-muted-foreground">Manage announcement bar messages</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setIsOpen(true); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" defaultValue={editing?.message} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="link_text">Link Text</Label>
                    <Input id="link_text" name="link_text" defaultValue={editing?.link_text || ''} placeholder="Shop Now" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link_url">Link URL</Label>
                    <Input id="link_url" name="link_url" defaultValue={editing?.link_url || ''} placeholder="/shop" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input id="start_date" name="start_date" type="datetime-local" defaultValue={editing?.start_date?.slice(0, 16) || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input id="end_date" name="end_date" type="datetime-local" defaultValue={editing?.end_date?.slice(0, 16) || ''} />
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
                  <TableHead>Message</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-xs truncate font-medium">{item.message}</TableCell>
                    <TableCell>{item.link_text || '-'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'Always'}
                      {item.end_date && ` - ${new Date(item.end_date).toLocaleDateString()}`}
                    </TableCell>
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
