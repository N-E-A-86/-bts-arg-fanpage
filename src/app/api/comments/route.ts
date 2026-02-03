import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/comments - Get comments for a news article
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const newsId = searchParams.get('news_id');

        if (!newsId) {
            return NextResponse.json(
                { error: 'news_id is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('news_id', newsId)
            .eq('is_approved', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
            return NextResponse.json(
                { error: 'Failed to fetch comments' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { news_id, author_name, content } = body;

        // Validation
        if (!news_id || !author_name || !content) {
            return NextResponse.json(
                { error: 'Missing required fields: news_id, author_name, content' },
                { status: 400 }
            );
        }

        if (content.length < 3 || content.length > 1000) {
            return NextResponse.json(
                { error: 'Comment must be between 3 and 1000 characters' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('comments')
            .insert({
                news_id,
                author_name: author_name.trim(),
                content: content.trim(),
                is_approved: false, // Requires moderation
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating comment:', error);
            return NextResponse.json(
                { error: 'Failed to create comment' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                data,
                message: 'Comment submitted successfully. It will appear after moderation.',
            },
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
