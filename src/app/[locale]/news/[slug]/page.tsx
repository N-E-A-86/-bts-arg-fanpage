import { getNewsBySlug } from "@/services/newsService";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default async function NewsDetailPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const newsItem = await getNewsBySlug(slug, locale);

    if (!newsItem) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <Link
                    href="/news"
                    className="inline-flex items-center text-primary-light hover:text-primary mb-12 transition-colors group"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a Noticias
                </Link>

                <header className="mb-12 animate-fade-in">
                    <span className="inline-block px-4 py-1 mb-6 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/20 text-primary-light rounded-full border border-primary/30">
                        {newsItem.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                        {newsItem.title}
                    </h1>
                    <div className="flex items-center text-text-muted text-sm font-medium uppercase tracking-widest">
                        <span className="w-8 h-px bg-primary/40 mr-4"></span>
                        {new Date(newsItem.published_at).toLocaleDateString(locale, {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </div>
                </header>

                {newsItem.image_url && (
                    <div className="relative aspect-video mb-16 rounded-3xl overflow-hidden glass-card p-2 border-primary/10">
                        <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                            <Image
                                src={newsItem.image_url}
                                alt={newsItem.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                <article className="glass-card p-8 md:p-12 text-lg text-text-muted leading-relaxed space-y-6">
                    {newsItem.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                </article>

                <footer className="mt-16 pt-16 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-text-muted mb-2">Compartir esta noticia</p>
                        <div className="flex gap-4">
                            {/* Placeholder for social sharing */}
                            <button className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center border border-glass-border transition-all">𝕏</button>
                            <button className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center border border-glass-border transition-all">f</button>
                            <button className="w-10 h-10 rounded-full bg-surface hover:bg-primary/20 flex items-center justify-center border border-glass-border transition-all">🔗</button>
                        </div>
                    </div>

                    <Link href="/news" className="btn-premium btn-outline px-8 py-3">
                        Explorar más noticias
                    </Link>
                </footer>
            </div>
        </main>
    );
}
