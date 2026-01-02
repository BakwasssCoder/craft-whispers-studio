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

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
}

export default function AdminFaq() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['admin-faq'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as FaqItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<FaqItem, 'id'>) => {
      const { error } = await supabase.from('faq_items').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast({ title: 'FAQ created successfully' });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: 'Error creating FAQ', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...item }: FaqItem) => {
      const { error } = await supabase.from('faq_items').update(item).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast({ title: 'FAQ updated successfully' });
      setIsOpen(false);
      setEditing(null);
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating FAQ', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('faq_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
      queryClient.invalidateQueries({ queryKey: ['faq-items'] });
      toast({ title: 'FAQ deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error deleting FAQ', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const item = {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: formData.get('category') as string || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: formData.get('is_active') === 'on',
    };

    if (editing) {
      updateMutation.mutate({ id: editing.id, ...item });
    } else {
      createMutation.mutate(item);
    }
  };

  const openEditDialog = (item: FaqItem) => {
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
            <h1 className="text-3xl font-bold text-foreground">FAQ</h1>
            <p className="text-muted-foreground">Manage frequently asked questions</p>
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setIsOpen(true); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input id="question" name="question" defaultValue={editing?.question} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea id="answer" name="answer" rows={4} defaultValue={editing?.answer} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category (optional)</Label>
                    <Input id="category" name="category" defaultValue={editing?.category || ''} placeholder="General" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input id="display_order" name="display_order" type="number" defaultValue={editing?.display_order || 0} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="is_active" name="is_active" defaultChecked={editing?.is_active ?? true} />
                  <Label htmlFor="is_active">Active</Label>
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
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-md truncate">{item.question}</TableCell>
                    <TableCell>{item.category || '-'}</TableCell>
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
