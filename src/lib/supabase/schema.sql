-- Database Schema for BTS Tour Companion

-- 1. News & Articles Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author TEXT DEFAULT 'ARMY Staff',
  locale TEXT NOT NULL DEFAULT 'es', -- es, pt, en
  published_at TIMESTAMPTZ DEFAULT NOW(),
  source_url TEXT, -- For scraped news
  is_approved BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'general', -- general, tour, rumor, project
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tour Dates Table
CREATE TABLE IF NOT EXISTS tour_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL, -- e.g. "BTS WORLD TOUR 'HOPE'"
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  country TEXT NOT NULL, -- Argentina, Brazil, Chile, etc.
  event_date TIMESTAMPTZ NOT NULL,
  ticket_url TEXT,
  status TEXT DEFAULT 'confirmed', -- rumor, confirmed, sold_out
  currency TEXT DEFAULT 'USD',
  price_start DECIMAL,
  locale_specific_info JSONB, -- For country-specific guides (transport, hotels)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Community / ARMY Profiles (Extending Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bias TEXT,
  country TEXT,
  favourite_song TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Scraper Logs
CREATE TABLE IF NOT EXISTS scraper_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- Weverse, Twitter, etc.
  status TEXT NOT NULL, -- success, failed
  items_found INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);
