import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// PATCH /api/comments/[id] - Approve/reject a comment
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
            .from('comments')
            .update({ is_approved })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating comment status:', error);
            return NextResponse.json(
                { error: 'Failed to update comment status' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            message: `Comment ${is_approved ? 'approved' : 'rejected'} successfully`,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting comment:', error);
            return NextResponse.json(
                { error: 'Failed to delete comment' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Comment deleted successfully',
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
