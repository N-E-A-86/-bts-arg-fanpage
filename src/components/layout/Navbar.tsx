"use client";

import { Link, usePathname, useRouter, routing } from "@/i18n/routing";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      style={{
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
    >
      <div className="section-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          BTS <span className="premium-gradient">{locale === 'pt' ? 'BRASIL' : 'ARGENTINA'}</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className="text-sm font-medium text-text-muted hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="bg-transparent text-text-muted text-xs border border-glass-border rounded px-2 py-1 outline-none hover:border-primary transition-colors cursor-pointer"
          >
            <option value="es">ES</option>
            <option value="pt">PT</option>
            <option value="en">EN</option>
          </select>

          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            {t("login")}
          </Link>
          <Link href="/register" className="btn-premium btn-primary py-2 px-6 text-sm">
            {t("join")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
