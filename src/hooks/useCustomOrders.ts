import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CustomOrderInput {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  description: string;
  image_urls?: string[];
  budget?: string;
  occasion?: string;
  deadline?: string;
}

export function useSubmitCustomOrder() {
  return useMutation({
    mutationFn: async (order: CustomOrderInput) => {
      const { data, error } = await supabase
        .from('custom_orders')
        .insert([order])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  });
}
