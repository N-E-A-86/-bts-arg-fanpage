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
    is_approved: boolean;
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

export async function getAllNews(locale: string = 'es', limit: number = 12, offset: number = 0) {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('locale', locale)
        .eq('is_approved', true)
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching all news:', error.message);
        return [];
    }

    return data as NewsItem[];
}

export async function getNewsBySlug(slug: string, locale: string = 'es') {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('locale', locale)
        .single();

    if (error) {
        console.error('Error fetching news by slug:', error.message);
        return null;
    }

    return data as NewsItem;
}

export async function getPendingNews() {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pending news:', error.message);
        return [];
    }

    return data as NewsItem[];
}

export async function updateNewsStatus(id: string, is_approved: boolean) {
    const { data, error } = await supabase
        .from('news')
        .update({ is_approved })
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating news status:', error.message);
        return null;
    }

    return data[0];
}

export async function deleteNews(id: string) {
    const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting news:', error.message);
        return false;
    }

    return true;
}
