"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        country: "ar"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for Supabase Auth registration
        console.log("Register attempt:", formData);
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
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">País</label>
                            <select
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                            />
                        </div>

                        <button type="submit" className="btn-premium btn-primary w-full py-4 mt-4 font-bold">
                            Crear mi cuenta
                        </button>
                    </form>

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
