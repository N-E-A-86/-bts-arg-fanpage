import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/news/[id] - Get a single news article by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching news:', error);
            return NextResponse.json(
                { error: 'News article not found' },
                { status: 404 }
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

// PUT /api/news/[id] - Update a news article (requires authentication)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, content, category, image_url, is_approved } = body;

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (category !== undefined) updateData.category = category;
        if (image_url !== undefined) updateData.image_url = image_url;
        if (is_approved !== undefined) updateData.is_approved = is_approved;

        const { data, error } = await supabase
            .from('news')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating news:', error);
            return NextResponse.json(
                { error: 'Failed to update news article' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            message: 'News article updated successfully',
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/news/[id] - Delete a news article (requires authentication)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting news:', error);
            return NextResponse.json(
                { error: 'Failed to delete news article' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'News article deleted successfully',
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PATCH /api/news/[id] - Approve/reject a news article
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { is_approved } = body;

        if (typeof is_approved !== 'boolean') {
            return NextResponse.json(
                { error: 'is_approved must be a boolean' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('news')
            .update({ is_approved })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating news status:', error);
            return NextResponse.json(
                { error: 'Failed to update news status' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            message: `News article ${is_approved ? 'approved' : 'rejected'} successfully`,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
