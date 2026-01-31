import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllNews } from "@/services/newsService";
import Image from "next/image";

export default async function NewsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations("NewsPage");
    const newsItems = await getAllNews(locale, 12);

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="section-container">
                <header className="mb-16 animate-fade-in">
                    <span className="inline-block px-4 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-primary/20 text-primary-light rounded-full border border-primary/30">
                        {t("badge")}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        BTS <span className="premium-gradient">News</span>
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl">
                        {t("subtitle")}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.length > 0 ? (
                        newsItems.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug}`}
                                className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="relative h-64 bg-primary/10">
                                    {item.image_url ? (
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary/30">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-muted line-clamp-3 mb-6">
                                        {item.content}
                                    </p>
                                    <div className="text-xs text-text-muted/60 uppercase tracking-tighter font-medium">
                                        {new Date(item.published_at).toLocaleDateString(locale, {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center glass-card">
                            <p className="text-xl text-text-muted">{t("noNews")}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
