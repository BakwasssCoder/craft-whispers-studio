import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export function useHeroBanners() {
  return useQuery({
    queryKey: ['hero-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as HeroBanner[];
    },
  });
}
