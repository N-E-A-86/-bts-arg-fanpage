"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for Supabase Auth will go here
        console.log("Login attempt:", { email });
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
                            />
                        </div>

                        <button type="submit" className="btn-premium btn-primary w-full py-4 font-bold text-lg">
                            Entrar
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
