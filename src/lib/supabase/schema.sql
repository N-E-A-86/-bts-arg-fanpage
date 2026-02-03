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

-- 5. Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID REFERENCES news(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_id UUID REFERENCES auth.users ON DELETE SET NULL, -- Optional if user is logged in
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster comment queries
CREATE INDEX IF NOT EXISTS idx_comments_news_id ON comments(news_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);

-- 6. Gallery Table (Fan Photos)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  author_name TEXT NOT NULL,
  author_id UUID REFERENCES auth.users ON DELETE SET NULL, -- Optional if user is logged in
  is_approved BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster gallery queries
CREATE INDEX IF NOT EXISTS idx_gallery_approved ON gallery(is_approved);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

-- 7. Reactions Table (for news articles)
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID REFERENCES news(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  reaction_type TEXT NOT NULL, -- heart, fire, purple_heart, borahae
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(news_id, user_id, reaction_type)
);

-- Create index for faster reaction queries
CREATE INDEX IF NOT EXISTS idx_reactions_news_id ON reactions(news_id);

-- 8. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'moderator', -- moderator, admin, super_admin
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add updated_at trigger for comments
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
