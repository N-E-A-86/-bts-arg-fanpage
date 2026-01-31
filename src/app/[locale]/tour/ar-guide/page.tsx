import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function ArgentinaGuidePage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <Link
                    href="/tour"
                    className="inline-flex items-center text-primary-light hover:text-primary mb-12 transition-colors group"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al Tour
                </Link>

                <header className="mb-16">
                    <h1 className="text-5xl font-bold tracking-tighter mb-4">Guía de Compra: <span className="premium-gradient">Argentina</span></h1>
                    <p className="text-xl text-text-muted italic">Todo lo que necesitas saber para conseguir tu entrada en AllAccess.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="glass-card p-6 border-primary/20 bg-primary/5">
                        <div className="text-3xl mb-4">💳</div>
                        <h3 className="font-bold mb-2">Plataforma</h3>
                        <p className="text-sm text-text-muted">AllAccess.com.ar</p>
                    </div>
                    <div className="glass-card p-6 border-primary/20 bg-primary/5">
                        <div className="text-3xl mb-4">🎫</div>
                        <h3 className="font-bold mb-2">Límite</h3>
                        <p className="text-sm text-text-muted">Max. 4 entradas por persona</p>
                    </div>
                    <div className="glass-card p-6 border-primary/20 bg-primary/5">
                        <div className="text-3xl mb-4">⚡</div>
                        <h3 className="font-bold mb-2">Tip</h3>
                        <p className="text-sm text-text-muted">Cargar tarjeta antes de la fila</p>
                    </div>
                </div>

                <article className="glass-card p-10 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm">1</span>
                            Registro Previo
                        </h2>
                        <p className="text-text-muted leading-relaxed">
                            No esperes al día de la venta. Crea tu cuenta en AllAccess hoy mismo, verifica tu mail y completa todos los datos de tu perfil. Asegúrate de tener una tarjeta de crédito o débito vinculada o a mano.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm">2</span>
                            La Fila Virtual
                        </h2>
                        <p className="text-text-muted leading-relaxed">
                            La fila suele abrir 30 minutos antes de la hora oficial. No refresques la página una vez que estés dentro de la fila, o perderás tu lugar. Recomendamos usar un solo dispositivo por cuenta para evitar bloqueos por IP.
                        </p>
                    </section>

                    <section className="bg-surface p-6 rounded-2xl border border-glass-border">
                        <h3 className="font-bold mb-2 text-primary">⚠️ Advertencia de Seguridad</h3>
                        <p className="text-sm text-text-muted italic">
                            AllAccess es la ÚNICA ticketera oficial. No compres en sitios de reventa como Viagogo o grupos de Facebook para evitar estafas.
                        </p>
                    </section>

                    <div className="pt-8">
                        <button className="btn-premium btn-primary px-10 py-4 w-full md:w-auto font-bold">
                            Ir a AllAccess Argentina
                        </button>
                    </div>
                </article>
            </div>
        </main>
    );
}
