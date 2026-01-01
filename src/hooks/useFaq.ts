import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export function useFaqItems() {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as FaqItem[];
    },
  });
}
