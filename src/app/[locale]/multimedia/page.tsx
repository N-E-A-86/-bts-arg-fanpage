import { getTranslations } from "next-intl/server";
import FanGallery from "@/components/gallery/FanGallery";

export default async function MultimediaPage() {
    const t = await getTranslations("Navbar");
    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="section-container">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4">{t("multimedia")}</h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Explora la galería compartida por nuestra comunidad ARMY Argentina.
                        Sube tus fotos de conciertos, eventos y momentos favoritos.
                    </p>
                </header>

                <FanGallery />
            </div>
        </main>
    );
}
