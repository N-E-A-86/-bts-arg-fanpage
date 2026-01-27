import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

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
              {t("hero.title")}<span className="premium-gradient">x</span> al <br />
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
            {/* Feature 1 */}
            <div className="glass-card p-10 hover:border-primary/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("features.translations.title")}</h3>
              <p className="text-text-muted">{t("features.translations.description")}</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-10 hover:border-primary/50 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/40 transition-colors">
                <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t("features.events.title")}</h3>
              <p className="text-text-muted">{t("features.events.description")}</p>
            </div>

            {/* Feature 3 */}
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

      {/* BTS Image Focus */}
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
