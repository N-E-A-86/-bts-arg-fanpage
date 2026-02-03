import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { supabase } from '@/lib/supabase/client';

interface ScrapedNews {
    title: string;
    url: string;
    date: string;
    imageUrl?: string;
}

async function scrapeWeverse(): Promise<ScrapedNews[]> {
    console.log('🚀 Starting Weverse Scraper...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const results: ScrapedNews[] = [];

    try {
        await page.goto('https://weverse.io/bts/officialpost', {
            waitUntil: 'networkidle',
            timeout: 60000,
        });
        await page.waitForTimeout(5000);

        const posts = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));
            return anchors
                .filter((a) => a.innerText.length > 20)
                .slice(0, 10)
                .map((a) => {
                    const imgEl = a.querySelector('img');
                    return {
                        title: a.innerText.trim(),
                        url: a.href,
                        date: new Date().toISOString(),
                        imageUrl: imgEl?.src || undefined,
                    };
                });
        });

        results.push(...posts);
        console.log(`✅ Found ${posts.length} posts on Weverse.`);
    } catch (error) {
        console.error('❌ Weverse Scraper failed:', error);
    } finally {
        await browser.close();
    }

    return results;
}

async function scrapeBigHit(): Promise<ScrapedNews[]> {
    console.log('🚀 Starting BigHit Music Scraper...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const results: ScrapedNews[] = [];

    try {
        await page.goto('https://ibighit.com/bts/eng/notice/', {
            waitUntil: 'networkidle',
            timeout: 60000,
        });

        const notices = await page.evaluate(() => {
            const list = document.querySelectorAll('ul li, .notice-list li');
            return Array.from(list)
                .slice(0, 10)
                .map((item) => {
                    const linkEl = item.querySelector('a') as HTMLAnchorElement;
                    const titleEl = item.querySelector('.title, strong, span') as HTMLElement;
                    const imgEl = item.querySelector('img');
                    return {
                        title: titleEl?.innerText.trim() || linkEl?.innerText.trim() || 'Untitled',
                        date: new Date().toISOString(),
                        url: linkEl?.href || '',
                        imageUrl: imgEl?.src || undefined,
                    };
                });
        });

        results.push(...notices);
        console.log(`✅ Found ${notices.length} notices on BigHit.`);
    } catch (error) {
        console.error('❌ BigHit Scraper failed:', error);
    } finally {
        await browser.close();
    }

    return results;
}

async function saveNewsToDatabase(news: ScrapedNews[], source: string, locale: string) {
    let successCount = 0;
    let errorCount = 0;

    for (const item of news) {
        if (!item.url || !item.title) continue;

        const slug = item.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 50) + `-${Date.now().toString().slice(-6)}`;

        const { error } = await supabase.from('news').insert({
            title: item.title,
            slug: slug,
            content: `Contenido extraído de ${source}. Link original: ${item.url}`,
            published_at: item.date,
            locale: locale,
            category: source,
            is_approved: false,
            image_url: item.imageUrl,
            source_url: item.url,
        });

        if (error) {
            if (!error.message.includes('unique constraint')) {
                console.error(`❌ Error saving ${source} post:`, error.message);
                errorCount++;
            }
        } else {
            successCount++;
        }
    }

    return { successCount, errorCount };
}

async function logScraperRun(source: string, itemsFound: number, status: string, errorMessage?: string) {
    await supabase.from('scraper_logs').insert({
        source,
        status,
        items_found: itemsFound,
        error_message: errorMessage,
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
    });
}

// GET /api/scraper/run - Manually trigger the scraper
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const source = searchParams.get('source') || 'all'; // weverse, bighit, or all
        const locale = searchParams.get('locale') || 'en';

        const results: any = {
            weverse: { success: 0, error: 0, total: 0 },
            bighit: { success: 0, error: 0, total: 0 },
        };

        // Scrape Weverse
        if (source === 'all' || source === 'weverse') {
            try {
                const weverseNews = await scrapeWeverse();
                results.weverse.total = weverseNews.length;
                const weverseResult = await saveNewsToDatabase(weverseNews, 'Weverse', locale);
                results.weverse.success = weverseResult.successCount;
                results.weverse.error = weverseResult.errorCount;
                await logScraperRun('Weverse', weverseNews.length, 'success');
            } catch (error: any) {
                await logScraperRun('Weverse', 0, 'failed', error.message);
                results.weverse.error = 1;
            }
        }

        // Scrape BigHit
        if (source === 'all' || source === 'bighit') {
            try {
                const bighitNews = await scrapeBigHit();
                results.bighit.total = bighitNews.length;
                const bighitResult = await saveNewsToDatabase(bighitNews, 'BigHit Official', locale);
                results.bighit.success = bighitResult.successCount;
                results.bighit.error = bighitResult.errorCount;
                await logScraperRun('BigHit', bighitNews.length, 'success');
            } catch (error: any) {
                await logScraperRun('BigHit', 0, 'failed', error.message);
                results.bighit.error = 1;
            }
        }

        return NextResponse.json({
            message: 'Scraper completed successfully',
            results,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Unexpected error in scraper:', error);
        return NextResponse.json(
            { error: 'Scraper failed', details: error },
            { status: 500 }
        );
    }
}
