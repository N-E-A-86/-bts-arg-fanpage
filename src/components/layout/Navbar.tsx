"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Noticias", href: "/news" },
    { name: "Artículos", href: "/articles" },
    { name: "Eventos ARMY", href: "/events-army" },
    { name: "Multimedia", href: "/multimedia" },
    { name: "Comunidad", href: "/community" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
      style={{
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
    >
      <div className="section-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          BTS <span className="premium-gradient">ARGENTINA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/register" className="btn-premium btn-primary py-2 px-6 text-sm">
            Join ARMY
          </Link>
        </div>
      </div>
    </nav>
  );
}
