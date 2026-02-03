"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
            <div className="section-container max-w-md w-full">
                <div className="glass-card p-10 relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

                    <header className="mb-10 text-center relative z-10">
                        <h1 className="text-4xl font-bold tracking-tighter mb-2">Bienvenid@ <span className="premium-gradient">ARMY</span></h1>
                        <p className="text-text-muted">Inicia sesión para activar tus alertas.</p>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-surface/50 border border-glass-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="tu@email.com"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-surface/50 border border-glass-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-colors"
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-premium btn-primary w-full py-4 font-bold text-lg disabled:opacity-50"
                        >
                            {loading ? "Cargando..." : "Entrar"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-text-muted relative z-10">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="text-primary hover:text-primary-light font-medium transition-colors">
                            Regístrate aquí
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
