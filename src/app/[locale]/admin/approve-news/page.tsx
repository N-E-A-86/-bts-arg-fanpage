"use client";

import { useEffect, useState } from "react";
import { getPendingNews, updateNewsStatus, deleteNews, NewsItem } from "@/services/newsService";
import Image from "next/image";

export default function ApproveNewsPage() {
    const [pendingNews, setPendingNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        setLoading(true);
        const data = await getPendingNews();
        setPendingNews(data);
        setLoading(false);
    };

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        const success = await updateNewsStatus(id, true);
        if (success) {
            setPendingNews(prev => prev.filter(item => item.id !== id));
        }
        setProcessingId(null);
    };

    const handleReject = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar esta noticia scrapeada?")) return;
        setProcessingId(id);
        const success = await deleteNews(id);
        if (success) {
            setPendingNews(prev => prev.filter(item => item.id !== id));
        }
        setProcessingId(null);
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Aprobación de Noticias</h1>
                <p className="text-text-muted">Revisa y autoriza las noticias encontradas por el scraper.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-transparent"></div>
                </div>
            ) : pendingNews.length === 0 ? (
                <div className="glass-card p-20 text-center">
                    <p className="text-xl text-text-muted">No hay noticias pendientes de revisión.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {pendingNews.map((item) => (
                        <div key={item.id} className="glass-card overflow-hidden flex flex-col md:flex-row gap-6 p-6">
                            <div className="relative w-full md:w-64 h-40 bg-surface rounded-xl overflow-hidden flex-shrink-0 border border-glass-border">
                                {item.image_url ? (
                                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted/30">Sin imagen</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.category}</span>
                                    <span className="text-[10px] text-text-muted">{new Date(item.published_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 truncate">{item.title}</h3>
                                <p className="text-text-muted text-sm line-clamp-3 mb-4">{item.content}</p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        disabled={!!processingId}
                                        className="btn-premium btn-primary py-2 px-6 text-sm disabled:opacity-50"
                                    >
                                        {processingId === item.id ? "Procesando..." : "Aprobar y Publicar"}
                                    </button>
                                    <button
                                        onClick={() => handleReject(item.id)}
                                        disabled={!!processingId}
                                        className="btn-premium btn-outline py-2 px-6 text-sm border-red-500/50 text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
