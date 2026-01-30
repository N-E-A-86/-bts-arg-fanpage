import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getLatestNews } from "@/services/newsService";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");
  const latestNews = await getLatestNews(locale, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="BTS Aesthetic Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-color-background" />
        </div>

        <div className="section-container relative z-10 animate-fade-in">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/20 text-primary-light rounded-full border border-primary/30">
              {t("hero.badge")}
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              {t("hero.title")}<span className="premium-gradient">@</span> al <br />
              <span className="text-white">ARMY {locale === 'pt' ? 'Brasil' : 'Argentina'}</span>
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/news" className="btn-premium btn-primary text-lg px-10 py-4">
                {t("hero.btnNews")}
              </Link>
              <Link href="/community" className="btn-premium btn-outline text-lg px-10 py-4">
                {t("hero.btnJoin")}
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements or scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Featured Sections Grid */}
      <section className="py-24 bg-color-background">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 hover:border-primary/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("features.translations.title")}</h3>
              <p className="text-text-muted">{t("features.translations.description")}</p>
            </div>

            <div className="glass-card p-10 hover:border-primary/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("features.events.title")}</h3>
              <p className="text-text-muted">{t("features.events.description")}</p>
            </div>

            <div className="glass-card p-10 hover:border-primary/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("features.community.title")}</h3>
              <p className="text-text-muted">{t("features.community.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      {latestNews.length > 0 && (
        <section className="py-24 bg-surface/30">
          <div className="section-container">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Últimas <span className="premium-gradient">Noticias</span></h2>
                <p className="text-text-muted text-lg">Mantente al día con Bangtan.</p>
              </div>
              <Link href="/news" className="text-primary hover:text-primary-light transition-colors font-medium">
                Ver todas &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <Link key={news.id} href={`/news/${news.slug}`} className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  <div className="relative h-48 bg-primary/10">
                    {news.image_url ? (
                      <Image src={news.image_url} alt={news.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/30">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">{news.category}</span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-text-muted text-sm line-clamp-3 mb-4">{news.content}</p>
                    <div className="text-[11px] text-text-muted/60 uppercase tracking-tighter">
                      {new Date(news.published_at).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BTS Image Focus Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden glass-card p-2 border-primary/20">
            <div className="relative w-full h-full rounded-[20px] overflow-hidden">
              <Image
                src="/images/bts-img-home.png"
                alt="BTS Group Project"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">{t("about.title")}</h2>
            <p className="text-lg text-text-muted mb-8 italic">
              "{t("about.quote")}" - BTS
            </p>
            <p className="text-lg text-text-muted mb-8">
              {t("about.description")}
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-sm text-primary">{t("about.stats.followers")}</div>
              </div>
              <div className="w-px h-12 bg-glass-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-primary">{t("about.stats.news")}</div>
              </div>
              <div className="w-px h-12 bg-glass-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{locale === 'pt' ? 'Brasil' : 'Argentina'}</div>
                <div className="text-sm text-primary">{t("about.stats.hq")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
