import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const initialNews = [
    {
        title: '¡BTS anuncia fechas del World Tour 2026!',
        slug: 'bts-world-tour-2026-anuncio',
        content: 'Bangtan Sonyeondan ha revelado oficialmente las primeras paradas de su gira mundial. ARMY en Sudamérica espera con ansias las confirmaciones para Buenos Aires y Santiago.',
        excerpt: 'La gira comenzará en Seúl y recorrerá los estadios más grandes del mundo.',
        locale: 'es',
        category: 'tour',
        is_approved: true,
    },
    {
        title: 'Traducción: Entrevista de RM para Rolling Stone',
        slug: 'traduccion-rm-rolling-stone',
        content: 'Namjoon habla sobre el proceso creativo de su nuevo álbum y el futuro de BTS tras el servicio militar.',
        excerpt: 'Una mirada profunda a la mente del líder de Bangtan.',
        locale: 'es',
        category: 'general',
        is_approved: true,
    },
    {
        title: 'BTS anuncia datas da World Tour 2026!',
        slug: 'bts-world-tour-2026-anuncio-pt',
        content: 'Bangtan Sonyeondan revelou oficialmente as primeiras paradas de sua turnê mundial. ARMY no Brasil aguarda ansiosamente as confirmações para São Paulo e Rio.',
        excerpt: 'A turnê começará em Seul e passará pelos maiores estádios do mundo.',
        locale: 'pt',
        category: 'tour',
        is_approved: true,
    },
    {
        title: 'BTS Announces World Tour 2026 Dates!',
        slug: 'bts-world-tour-2026-anuncio-en',
        content: 'Bangtan Sonyeondan has officially revealed the first stops of their world tour. ARMY around the world is eagerly waiting for stadium confirmations.',
        excerpt: 'The tour will kick off in Seoul and travel to the world\'s largest venues.',
        locale: 'en',
        category: 'tour',
        is_approved: true,
    }
];

async function seed() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase credentials missing!');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('🌱 Seeding initial news...');

    for (const item of initialNews) {
        const { error } = await supabase.from('news').upsert(item, { onConflict: 'slug' });
        if (error) console.error(`❌ Error seeding ${item.title}:`, error.message);
        else console.log(`✅ Seeded: ${item.title}`);
    }

    console.log('🏁 Seeding finished.');
}

seed();
