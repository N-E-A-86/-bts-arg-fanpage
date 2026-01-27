import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Use service role if possible for scraper

async function scrapeWeverse() {
    console.log('🚀 Starting Weverse Scraper...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Note: This is an example selector. Weverse changes often.
        // In a real scenario, we might use their private API or a more robust selector.
        await page.goto('https://weverse.io/bts/officialpost', { waitUntil: 'networkidle' });

        // Logic to extract post titles, dates, and links
        const posts = await page.evaluate(() => {
            // Dummy selection logic for demonstration
            return Array.from(document.querySelectorAll('a')).slice(0, 5).map(a => ({
                title: a.innerText,
                url: a.href,
                date: new Date().toISOString()
            }));
        });

        console.log(`✅ Found ${posts.length} posts.`);

        // Save to Supabase (only if credentials exist)
        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            for (const post of posts) {
                const { error } = await supabase
                    .from('news')
                    .upsert({
                        title: post.title,
                        source_url: post.url,
                        slug: post.title.toLowerCase().replace(/ /g, '-').slice(0, 50),
                        content: 'Contenido extraído de Weverse. Revisar original.',
                        published_at: post.date,
                        locale: 'en', // Usually English in official posts
                        is_approved: false // Admin must approve
                    }, { onConflict: 'slug' });

                if (error) console.error('❌ Error saving post:', error.message);
            }
        }

    } catch (error) {
        console.error('❌ Scraper failed:', error);
    } finally {
        await browser.close();
        console.log('🏁 Scraper finished.');
    }
}

scrapeWeverse();
