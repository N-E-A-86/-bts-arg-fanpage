"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-xl py-3 shadow-2xl" : "bg-transparent py-6"
        }`}
      style={{
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
      }}
    >
      <div className="max-w-[1440px] px-6 lg:px-12 mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex-shrink-0 group">
          BTS <span className="premium-gradient group-hover:brightness-125 transition-all">{locale === 'pt' ? 'BRASIL' : 'ARGENTINA'}</span>
        </Link>

        {/* Desktop Links - Improved spacing and interactions */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-6 bg-white/5 px-4 xl:px-6 py-2 rounded-full border border-white/10 backdrop-blur-md transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className={`text-[12px] xl:text-[13px] px-3 py-1 rounded-full font-semibold tracking-wide uppercase transition-all duration-300 hover:text-primary-light hover:bg-white/5 ${pathname === link.href ? "text-white bg-white/10" : "text-text-muted"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
          <div className="relative group flex items-center">
            <div className="absolute left-2.5 pointer-events-none text-primary-light">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="bg-white/10 hover:bg-white/15 text-white text-[12px] font-bold border border-white/20 rounded-full pl-8 pr-8 py-2 outline-none hover:border-primary transition-all cursor-pointer appearance-none shadow-sm"
              aria-label="Select Language"
            >
              <option value="es" className="bg-surface text-white">ES</option>
              <option value="pt" className="bg-surface text-white">PT</option>
              <option value="en" className="bg-surface text-white">EN</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
            <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors">
              {t("login")}
            </Link>
            <Link href="/register" className="btn-premium btn-primary py-2.5 px-6 text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-primary/20 transition-all">
              {t("join")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
