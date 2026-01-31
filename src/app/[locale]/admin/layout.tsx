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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 text-text-muted hover:text-primary transition-all group opacity-50 cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Estadísticas
                    </Link>
                </nav>
            </aside>

            <main className="lg:ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
