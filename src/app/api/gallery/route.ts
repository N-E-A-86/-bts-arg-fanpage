import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/gallery - Get gallery photos with pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');
        const approved = searchParams.get('approved') !== 'false';

        const { data, error, count } = await supabase
            .from('gallery')
            .select('*', { count: 'exact' })
            .eq('is_approved', approved)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching gallery:', error);
            return NextResponse.json(
                { error: 'Failed to fetch gallery photos' },
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

// POST /api/gallery - Upload a new photo
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image_url, caption, author_name } = body;

        if (!image_url || !author_name) {
            return NextResponse.json(
                { error: 'Missing required fields: image_url, author_name' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('gallery')
            .insert({
                image_url,
                caption: caption || '',
                author_name: author_name.trim(),
                is_approved: false, // Requires moderation
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error uploading photo:', error);
            return NextResponse.json(
                { error: 'Failed to upload photo' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                data,
                message: 'Photo uploaded successfully. It will appear after moderation.',
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
