import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Panel de Administración</h1>
                <p className="text-text-muted">Gestiona el contenido de la plataforma desde un solo lugar.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: "Estadísticas",
                        description: "Visualiza el rendimiento y actividad del sitio.",
                        href: "/admin/stats",
                        icon: "📊"
                    },
                    {
                        title: "Aprobar Noticias",
                        description: "Modera las noticias recolectadas por el scraper.",
                        href: "/admin/approve-news",
                        icon: "📰"
                    },
                    {
                        title: "Gestión Scraper",
                        description: "Configura y ejecuta los scrapers de noticias.",
                        href: "/admin/scraper",
                        icon: "🤖"
                    }
                ].map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="glass-card p-6 block hover:border-primary/50 transition-all group"
                    >
                        <div className="text-3xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-text-muted text-sm">{item.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
