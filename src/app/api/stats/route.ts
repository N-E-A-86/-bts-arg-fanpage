import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/stats - Get website statistics (admin only)
export async function GET(request: NextRequest) {
    try {
        // Get total news count
        const { count: totalNews } = await supabase
            .from('news')
            .select('*', { count: 'exact', head: true });

        // Get approved news count
        const { count: approvedNews } = await supabase
            .from('news')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', true);

        // Get pending news count
        const { count: pendingNews } = await supabase
            .from('news')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', false);

        // Get total comments count
        const { count: totalComments } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true });

        // Get approved comments count
        const { count: approvedComments } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', true);

        // Get pending comments count
        const { count: pendingComments } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', false);

        // Get total gallery photos count
        const { count: totalPhotos } = await supabase
            .from('gallery')
            .select('*', { count: 'exact', head: true });

        // Get approved photos count
        const { count: approvedPhotos } = await supabase
            .from('gallery')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', true);

        // Get pending photos count
        const { count: pendingPhotos } = await supabase
            .from('gallery')
            .select('*', { count: 'exact', head: true })
            .eq('is_approved', false);

        // Get news by category
        const { data: newsByCategory } = await supabase
            .from('news')
            .select('category')
            .eq('is_approved', true);

        const categoryCounts = newsByCategory?.reduce((acc: any, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { count: recentNews } = await supabase
            .from('news')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sevenDaysAgo.toISOString());

        const { count: recentComments } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sevenDaysAgo.toISOString());

        return NextResponse.json({
            news: {
                total: totalNews || 0,
                approved: approvedNews || 0,
                pending: pendingNews || 0,
                recent: recentNews || 0,
                byCategory: categoryCounts || {},
            },
            comments: {
                total: totalComments || 0,
                approved: approvedComments || 0,
                pending: pendingComments || 0,
                recent: recentComments || 0,
            },
            gallery: {
                total: totalPhotos || 0,
                approved: approvedPhotos || 0,
                pending: pendingPhotos || 0,
            },
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
