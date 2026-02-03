"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        country: "ar"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                        country: formData.country,
                    }
                }
            });

            if (authError) throw authError;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent">
            <div className="section-container max-w-md w-full">
                <div className="glass-card p-10 relative overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

                    <header className="mb-10 text-center relative z-10">
                        <h1 className="text-4xl font-bold tracking-tighter mb-2">Únete a la <span className="premium-gradient">Comunidad</span></h1>
                        <p className="text-text-muted">Crea tu cuenta para no perderte nada.</p>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-shake">
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center space-y-6 relative z-10">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold">¡Registro exitoso!</h2>
                            <p className="text-text-muted">Hemos enviado un correo de confirmación. Por favor revisa tu bandeja de entrada.</p>
                            <Link href="/login" className="btn-premium btn-primary block py-4">Ir al Login</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="Tu nombre ARMY"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="tu@email.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">País</label>
                                <select
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    disabled={loading}
                                    className="w-full bg-surface/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                                >
                                    <option value="ar">Argentina 🇦🇷</option>
                                    <option value="br">Brasil 🇧🇷</option>
                                    <option value="cl">Chile 🇨🇱</option>
                                    <option value="uy">Uruguay 🇺🇾</option>
                                    <option value="py">Paraguay 🇵🇾</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Contraseña</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-surface/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-premium btn-primary w-full py-4 mt-4 font-bold disabled:opacity-50"
                            >
                                {loading ? "Registrando..." : "Crear mi cuenta"}
                            </button>
                        </form>
                    )}

                    <p className="mt-8 text-center text-xs text-text-muted relative z-10">
                        Al registrarte aceptas las políticas de la comunidad. <br />
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">Entrar</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
