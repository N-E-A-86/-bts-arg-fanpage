import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/scraper/logs - Get scraper execution logs
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const source = searchParams.get('source');

        let query = supabase
            .from('scraper_logs')
            .select('*')
            .order('started_at', { ascending: false })
            .limit(limit);

        if (source) {
            query = query.eq('source', source);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching scraper logs:', error);
            return NextResponse.json(
                { error: 'Failed to fetch scraper logs' },
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
