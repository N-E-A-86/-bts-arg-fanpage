"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const isDesktop = windowWidth >= 1024;

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("news"), href: "/news" },
    { name: t("tour"), href: "/tour" },
    { name: t("articles"), href: "/articles" },
    { name: t("events"), href: "/events-army" },
    { name: t("multimedia"), href: "/multimedia" },
    { name: t("community"), href: "/community" },
  ];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled || isMobileMenuOpen ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px)' : 'none',
        borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-[110]">
            <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.05em', color: 'white' }}>
              BTS <span className="premium-gradient">ARGENTINA</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {isDesktop && (
            <nav className="flex-1 flex justify-center items-center px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href as any}
                  style={{
                    margin: '0 8px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    backgroundColor: pathname === link.href ? 'rgba(138, 77, 255, 0.1)' : 'transparent',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  className="hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Right */}
          {isDesktop && (
            <div className="flex items-center gap-6">
              <div className="relative">
                <select
                  value={locale}
                  onChange={(e) => handleLocaleChange(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 900,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '100px',
                    padding: '8px 32px 8px 12px',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="es" className="bg-surface">ES</option>
                  <option value="en" className="bg-surface">EN</option>
                  <option value="pt" className="bg-surface">PT</option>
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {user ? (
                <Link href="/admin" className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black uppercase">
                  {user.email?.[0]}
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white">
                    {t("login")}
                  </Link>
                  <Link href="/register" className="btn-premium btn-primary py-2 px-5 text-[10px] uppercase font-black tracking-widest">
                    {t("join")}
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Right */}
          {!isDesktop && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLocaleChange(locale === 'es' ? 'en' : 'es')}
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '6px 12px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {locale.toUpperCase()}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  padding: '8px',
                  borderRadius: '12px',
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  outline: 'none',
                  zIndex: 110,
                  cursor: 'pointer'
                }}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 8h16M4 16h16" /></svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {!isDesktop && isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '80px',
            backgroundColor: 'rgba(10, 10, 15, 0.98)',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href as any}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'between',
                  color: pathname === link.href ? 'var(--color-primary)' : 'white',
                  backgroundColor: pathname === link.href ? 'rgba(138, 77, 255, 0.1)' : 'transparent',
                  marginBottom: '8px'
                }}
              >
                <span className="flex-1">{link.name}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
          <div className="mt-auto py-8 flex flex-col gap-4 border-t border-white/5">
            {user ? (
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full btn-premium btn-primary py-4 text-center font-black uppercase text-sm tracking-widest">
                Panel Admin
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-center rounded-2xl bg-white/5 font-black uppercase text-xs tracking-widest text-white">
                  {t("login")}
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-premium btn-primary py-4 text-center font-black uppercase text-sm tracking-widest">
                  {t("join")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
