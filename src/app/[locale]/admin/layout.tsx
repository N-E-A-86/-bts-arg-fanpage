import { Link } from "@/i18n/routing";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-color-background flex flex-col pt-24">
            <aside className="fixed left-0 top-24 bottom-0 w-64 bg-surface/50 backdrop-blur-md border-r border-glass-border hidden lg:block overflow-y-auto z-40">
                <nav className="p-6 space-y-2">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-4">Menu Admin</div>
                    <Link
                        href="/admin/approve-news"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-text-muted hover:text-primary transition-all group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Aprobar Noticias
                    </Link>
                    <Link
                        href="/admin/stats"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-text-muted hover:text-primary transition-all group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Estadísticas
                    </Link>
                    <Link
                        href="/admin/scraper"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-text-muted hover:text-primary transition-all group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Gestión Scraper
                    </Link>
                    <Link
                        href="/admin/gallery"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-text-muted hover:text-primary transition-all group"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Moderar Galería
                    </Link>

                    <div className="pt-4 mt-4 border-t border-glass-border">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface text-text-muted hover:text-white transition-all group"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Volver al Sitio
                        </Link>
                    </div>
                </nav>
            </aside>

            <main className="lg:ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
