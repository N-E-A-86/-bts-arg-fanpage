import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/news - Get all approved news with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'es';
        const limit = parseInt(searchParams.get('limit') || '12');
        const offset = parseInt(searchParams.get('offset') || '0');
        const category = searchParams.get('category');
        const approved = searchParams.get('approved') !== 'false'; // Default to true

        let query = supabase
            .from('news')
            .select('*', { count: 'exact' })
            .eq('locale', locale)
            .eq('is_approved', approved)
            .order('published_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('Error fetching news:', error);
            return NextResponse.json(
                { error: 'Failed to fetch news' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            count,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/news - Create a new news article (requires authentication)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, locale, category, image_url } = body;

        // Validation
        if (!title || !content || !locale) {
            return NextResponse.json(
                { error: 'Missing required fields: title, content, locale' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 60) + `-${Date.now().toString().slice(-6)}`;

        const { data, error } = await supabase
            .from('news')
            .insert({
                title,
                slug,
                content,
                locale,
                category: category || 'General',
                image_url,
                published_at: new Date().toISOString(),
                is_approved: false, // Requires admin approval
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating news:', error);
            return NextResponse.json(
                { error: 'Failed to create news article' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { data, message: 'News article created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
