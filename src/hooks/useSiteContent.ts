import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteContent {
  id: string;
  page_key: string;
  title: string | null;
  content: Record<string, any>;
  updated_at: string;
}

export function useSiteContent(pageKey: string) {
  return useQuery({
    queryKey: ['site-content', pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page_key', pageKey)
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteContent | null;
    },
    enabled: !!pageKey,
  });
}
