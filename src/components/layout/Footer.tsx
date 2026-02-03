"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();

    const socialLinks = [
        {
            name: "Twitter", href: "#", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
            )
        },
        {
            name: "Instagram", href: "#", icon: (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            )
        },
        {
            name: "TikTok", href: "#", icon: (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.92-.35-2.81.04-.67.32-1.21.87-1.51 1.54-.26.57-.28 1.23-.19 1.84.1.84.53 1.62 1.14 2.19.61.57 1.41.91 2.24.96.84.07 1.71-.15 2.4-.64.91-.67 1.4-1.78 1.41-2.91.01-2.92-.01-5.84.02-8.750l0-.12c0-.5-.01-1-.01-1.5z" /></svg>
            )
        },
    ];

    return (
        <footer className="relative pt-24 pb-12 bg-color-background overflow-hidden border-t border-white/5">
            {/* Background decoration */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-5">
                        <Link href="/" className="inline-block text-3xl font-black tracking-tighter mb-8 group">
                            BTS <span className="premium-gradient group-hover:brightness-110 transition-all">ARGENTINA</span>
                        </Link>
                        <p className="text-text-muted text-lg leading-relaxed max-w-md mb-10">
                            {t("tagline") || "La comunidad de fans de BTS más grande de Argentina. Uniendo a ARMY desde 2013."}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-surface/50 border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all group shadow-sm"
                                    aria-label={social.name}
                                >
                                    <div className="flex items-center justify-center transition-transform group-hover:scale-110" style={{ width: '20px', height: '20px' }}>
                                        {social.icon}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Navegación</h4>
                            <ul className="space-y-4">
                                {["Inicio", "Noticias", "Multimedia", "Comunidad"].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={`/${item.toLowerCase() === "inicio" ? "" : item.toLowerCase()}`}
                                            className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Contenido</h4>
                            <ul className="space-y-4">
                                {["World Tour", "Artículos", "Eventos", "Traducciones"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Información</h4>
                            <ul className="space-y-4">
                                {["Contacto", "Privacidad", "Términos", "FAQ"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} BTS ARGENTINA.</p>
                        <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
                        <p className="text-primary-light/60">No oficial • Por fans para fans</p>
                    </div>
                    <div className="flex gap-8">
                        <span className="text-primary-light/40">Borahae 💜</span>
                    </div>
                </div>

                <div className="mt-12 p-6 rounded-3xl bg-surface/30 border border-white/5 text-[10px] text-text-muted/50 leading-loose text-center">
                    BTS ARGENTINA es un proyecto realizado por fans. No estamos afiliados con BigHit Music, HYBE Corp, ni ninguna de sus subsidiarias.
                </div>
            </div>
        </footer>
    );
}
