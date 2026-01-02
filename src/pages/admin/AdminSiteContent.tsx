import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SiteContent {
  id: string;
  page_key: string;
  title: string | null;
  content: Record<string, any>;
}

export default function AdminSiteContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<SiteContent | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ['admin-site-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('page_key', { ascending: true });
      if (error) throw error;
      return data as SiteContent[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<SiteContent, 'id'>) => {
      const { error } = await supabase.from('site_content').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-site-content'] });
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast({ title: 'Content created successfully' });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating content', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...item }: SiteContent) => {
      const { error } = await supabase.from('site_content').update(item).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-site-content'] });
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast({ title: 'Content updated successfully' });
      setIsOpen(false);
      setEditing(null);
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating content', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('site_content').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-site-content'] });
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast({ title: 'Content deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting content', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let contentJson = {};
    try {
      contentJson = JSON.parse(formData.get('content') as string);
    } catch {
      toast({ title: 'Invalid JSON in content field', variant: 'destructive' });
      return;
    }

    const item = {
      page_key: formData.get('page_key') as string,
      title: formData.get('title') as string || null,
      content: contentJson,
    };

    if (editing) {
      updateMutation.mutate({ id: editing.id, ...item });
    } else {
      createMutation.mutate(item);
    }
  };

  const openEditDialog = (item: SiteContent) => {
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
            <h1 className="text-3xl font-bold text-foreground">Site Content</h1>
            <p className="text-muted-foreground">Manage page content (About, Contact, etc.)</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setIsOpen(true); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Content' : 'Add New Content'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="page_key">Page Key</Label>
                    <Input id="page_key" name="page_key" defaultValue={editing?.page_key} placeholder="about, contact, etc." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={editing?.title || ''} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (JSON)</Label>
                  <Textarea 
                    id="content" 
                    name="content" 
                    rows={10} 
                    defaultValue={editing ? JSON.stringify(editing.content, null, 2) : '{\n  \n}'} 
                    className="font-mono text-sm"
                    required 
                  />
                  <p className="text-xs text-muted-foreground">Enter valid JSON. Keys depend on the page (e.g., story, mission, values for About page)</p>
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
                  <TableHead>Page Key</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Content Keys</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.page_key}</TableCell>
                    <TableCell>{item.title || '-'}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {Object.keys(item.content).join(', ') || '-'}
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
