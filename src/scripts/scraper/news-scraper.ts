import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Use service role if possible for scraper

async function scrapeWeverse() {
    console.log('🚀 Starting Weverse Scraper...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://weverse.io/bts/officialpost', { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(5000); // Wait for JS to render

        const posts = await page.evaluate(() => {
            // Broaden search to find any links that might be posts
            const anchors = Array.from(document.querySelectorAll('a'));
            return anchors
                .filter(a => a.innerText.length > 20) // Likely a title
                .slice(0, 5)
                .map(a => ({
                    title: a.innerText.trim(),
                    url: a.href,
                    date: new Date().toISOString()
                }));
        });

        console.log(`✅ Found ${posts.length} potential posts on Weverse.`);

        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            for (const post of posts) {
                if (!post.url || !post.title) continue;

                const slug = post.title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                    .slice(0, 50);

                const { error } = await supabase
                    .from('news')
                    .insert({
                        title: post.title,
                        slug: `${slug}-${Date.now().toString().slice(-4)}`,
                        content: `Contenido extraído de Weverse. Link original: ${post.url}`,
                        published_at: post.date,
                        locale: 'en',
                        category: 'Weverse',
                        is_approved: false
                    });

                if (error && !error.message.includes('unique constraint')) {
                    console.error('❌ Error saving Weverse post:', error.message);
                }
            }
        }
    } catch (error) {
        console.error('❌ Weverse Scraper failed:', error);
    } finally {
        await browser.close();
    }
}

async function scrapeBigHit() {
    console.log('🚀 Starting BigHit Music Scraper...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://ibighit.com/bts/eng/notice/', { waitUntil: 'networkidle', timeout: 60000 });

        const notices = await page.evaluate(() => {
            // Look for any list items or links in the main content area
            const list = document.querySelectorAll('ul li, .notice-list li');
            return Array.from(list).slice(0, 5).map(item => {
                const linkEl = item.querySelector('a') as HTMLAnchorElement;
                const titleEl = item.querySelector('.title, strong, span') as HTMLElement;
                return {
                    title: titleEl?.innerText.trim() || linkEl?.innerText.trim() || 'Untitled',
                    date: new Date().toISOString(),
                    url: linkEl?.href || ''
                };
            });
        });

        console.log(`✅ Found ${notices.length} potential notices on BigHit.`);

        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            for (const notice of notices) {
                if (!notice.url) continue;

                const slug = notice.title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                const { error } = await supabase
                    .from('news')
                    .insert({
                        title: notice.title,
                        slug: `${slug}-${Date.now().toString().slice(-4)}`,
                        content: `Nueva notificación oficial de BigHit Music. Link original: ${notice.url}`,
                        published_at: new Date(notice.date).toISOString(),
                        locale: 'en',
                        category: 'Oficial',
                        is_approved: false
                    });

                if (error && !error.message.includes('unique constraint')) {
                    console.error('❌ Error saving BigHit notice:', error.message);
                }
            }
        }
    } catch (error) {
        console.error('❌ BigHit Scraper failed:', error);
    } finally {
        await browser.close();
    }
}

async function runScrapers() {
    await scrapeWeverse();
    await scrapeBigHit();
}

runScrapers();
