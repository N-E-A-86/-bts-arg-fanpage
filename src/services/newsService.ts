import { supabase } from '@/lib/supabase/client';

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url?: string;
    published_at: string;
    locale: string;
    category: string;
}

export async function getLatestNews(locale: string = 'es', limit: number = 10) {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('locale', locale)
        .eq('is_approved', true)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching news:', error.message);
        return [];
    }

    return data as NewsItem[];
}
