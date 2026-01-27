export default function Footer() {
    return (
        <footer className="py-16 bg-black border-t border-glass-border">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-6">BTS <span className="premium-gradient">ARGENTINA</span></h3>
                        <p className="text-text-muted max-w-sm">
                            La comunidad más grande de Argentina dedicada a apoyar y seguir a BTS.
                            Síguenos en nuestras redes sociales para estar al día.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Navegación</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li><a href="/" className="hover:text-primary transition-colors">Inicio</a></li>
                            <li><a href="/news" className="hover:text-primary transition-colors">Noticias</a></li>
                            <li><a href="/events" className="hover:text-primary transition-colors">Eventos</a></li>
                            <li><a href="/community" className="hover:text-primary transition-colors">Comunidad</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Social</h4>
                        <ul className="space-y-4 text-text-muted text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter (X)</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} BTS ARGENTINA ARMY FANPAGE. WE ARE NOT SEVEN WITH YOU.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
