import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();

    return (
        <footer className="py-16 bg-black border-t border-glass-border">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-6">BTS <span className="premium-gradient">{locale === 'pt' ? 'BRASIL' : 'ARGENTINA'}</span></h3>
                        <p className="text-text-muted max-w-sm">
                            {t("tagline")}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">{t("nav")}</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                            <li><Link href="/news" className="hover:text-primary transition-colors">Noticias</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Eventos</Link></li>
                            <li><Link href="/community" className="hover:text-primary transition-colors">Comunidad</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">{t("social")}</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter (X)</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} BTS {locale === 'pt' ? 'BRASIL' : 'ARGENTINA'} ARMY FANPAGE. {t("rights")}</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
