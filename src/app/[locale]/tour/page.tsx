import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function TourPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations("TourPage");

    const countries = ["ar", "br", "cl"];

    return (
        <main className="min-h-screen pt-32 pb-24">
            <section className="section-container relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

                <header className="mb-20 animate-fade-in text-center">
                    <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/20 text-primary-light rounded-full border border-primary/30">
                        2025-2026 World Tour
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        {t("title")} <span className="premium-gradient">Sudamérica</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {countries.map((country) => (
                        <div key={country} className="glass-card group overflow-hidden transition-all duration-500 hover:border-primary/50">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h3 className="text-4xl font-bold mb-2 group-hover:text-primary transition-colors">{t(`${country}.title`)}</h3>
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary-light/60">{t(`${country}.venue`)}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                                        {country === 'ar' ? '🇦🇷' : country === 'br' ? '🇧🇷' : '🇨🇱'}
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Estado</div>
                                            <div className="text-lg font-medium">{t(`${country}.status`)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-surface-light" />
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Venta de Entradas</div>
                                            <div className="text-lg font-medium">{t(`${country}.guide`)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link href={`/tour/${country}-guide`} className="btn-premium btn-primary w-full text-center py-4 text-sm font-bold">
                                        Ver Guía de Compra
                                    </Link>
                                    <Link href={`/tour/${country}-hotels`} className="btn-premium btn-outline w-full text-center py-4 text-sm font-bold border-glass-border">
                                        Alojamiento ARMY
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Banner */}
                <div className="mt-20 p-10 glass-card border-primary/20 bg-primary/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-bold mb-4 italic">"We are not seven with you"</h2>
                            <p className="text-text-muted">
                                Suscríbete a nuestras alertas para recibir una notificación instantánea en cuanto se confirme una fecha oficial en cualquier país de Sudamérica.
                            </p>
                        </div>
                        <Link href="/register" className="btn-premium btn-primary px-10 py-4 text-lg whitespace-nowrap">
                            Activar Alertas de Tour
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent -z-0 translate-x-1/2 group-hover:translate-x-0 transition-transform duration-1000" />
                </div>
            </section>
        </main>
    );
}
