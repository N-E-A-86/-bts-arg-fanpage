'use client';

import { useState, useEffect } from 'react';

interface StatsData {
    news: {
        total: number;
        approved: number;
        pending: number;
        recent: number;
        byCategory: Record<string, number>;
    };
    comments: {
        total: number;
        approved: number;
        pending: number;
        recent: number;
    };
    gallery: {
        total: number;
        approved: number;
        pending: number;
    };
}

export default function AdminStatsPage() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="glass-card p-12 text-center">
                <p className="text-text-muted">Error al cargar estadísticas</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    Panel de <span className="premium-gradient">Estadísticas</span>
                </h1>
                <p className="text-text-muted">Métricas y análisis del sitio web</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total News */}
                <div className="glass-card p-6 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.news.total}</div>
                    <div className="text-sm text-text-muted">Noticias Totales</div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-green-400">✓ {stats.news.approved} aprobadas</span>
                        <span className="text-orange-400">⏳ {stats.news.pending} pendientes</span>
                    </div>
                </div>

                {/* Total Comments */}
                <div className="glass-card p-6 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.comments.total}</div>
                    <div className="text-sm text-text-muted">Comentarios</div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-green-400">✓ {stats.comments.approved}</span>
                        <span className="text-orange-400">⏳ {stats.comments.pending}</span>
                    </div>
                </div>

                {/* Total Gallery Photos */}
                <div className="glass-card p-6 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.gallery.total}</div>
                    <div className="text-sm text-text-muted">Fotos en Galería</div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-green-400">✓ {stats.gallery.approved}</span>
                        <span className="text-orange-400">⏳ {stats.gallery.pending}</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.news.recent + stats.comments.recent}</div>
                    <div className="text-sm text-text-muted">Actividad (7 días)</div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-primary">📰 {stats.news.recent} noticias</span>
                        <span className="text-blue-400">💬 {stats.comments.recent} comentarios</span>
                    </div>
                </div>
            </div>

            {/* News by Category */}
            <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Noticias por Categoría</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(stats.news.byCategory).map(([category, count]) => (
                        <div key={category} className="text-center p-4 rounded-xl bg-surface/50 border border-glass-border">
                            <div className="text-2xl font-bold text-primary mb-1">{count}</div>
                            <div className="text-sm text-text-muted capitalize">{category}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/admin/approve-news" className="btn-premium btn-primary py-3 text-center">
                        Revisar Noticias Pendientes ({stats.news.pending})
                    </a>
                    <button className="btn-premium btn-outline py-3">
                        Moderar Comentarios ({stats.comments.pending})
                    </button>
                    <button className="btn-premium btn-outline py-3">
                        Revisar Galería ({stats.gallery.pending})
                    </button>
                </div>
            </div>
        </div>
    );
}
