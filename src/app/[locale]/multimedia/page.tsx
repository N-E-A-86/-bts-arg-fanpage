import { getTranslations } from "next-intl/server";

export default async function MultimediaPage() {
    const t = await getTranslations("Navbar");
    return (
        <main className="min-h-screen pt-32 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">{t("multimedia")}</h1>
                <p className="text-text-muted">Próximamente: Galería de fotos, videos y contenido visual exclusivo.</p>
                <div className="mt-8 animate-pulse text-primary">Próximamente...</div>
            </div>
        </main>
    );
}
