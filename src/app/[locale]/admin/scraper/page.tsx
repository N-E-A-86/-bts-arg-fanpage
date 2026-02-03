'use client';

import { useState, useEffect } from 'react';

interface ScraperLog {
    id: string;
    source: string;
    status: string;
    items_found: number;
    error_message?: string;
    started_at: string;
    ended_at?: string;
}

export default function ScraperManagementPage() {
    const [logs, setLogs] = useState<ScraperLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [selectedSource, setSelectedSource] = useState('all');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/scraper/logs?limit=20');
            const data = await response.json();
            setLogs(data.data || []);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const runScraper = async () => {
        setRunning(true);
        try {
            const response = await fetch(`/api/scraper/run?source=${selectedSource}&locale=es`);
            const data = await response.json();

            if (response.ok) {
                alert(`Scraper ejecutado exitosamente!\nWeverse: ${data.results.weverse.success} nuevas\nBigHit: ${data.results.bighit.success} nuevas`);
                fetchLogs();
            } else {
                alert('Error al ejecutar el scraper');
            }
        } catch (error) {
            console.error('Error running scraper:', error);
            alert('Error al ejecutar el scraper');
        } finally {
            setRunning(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    Gestión de <span className="premium-gradient">Scraper</span>
                </h1>
                <p className="text-text-muted">Ejecuta y monitorea el web scraper de noticias</p>
            </div>

            {/* Control Panel */}
            <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 text-text-muted">
                            Fuente de noticias
                        </label>
                        <select
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors"
                        >
                            <option value="all">🌐 Todas las fuentes</option>
                            <option value="weverse">💜 Weverse</option>
                            <option value="bighit">🎵 BigHit Music</option>
                        </select>
                    </div>
                    <button
                        onClick={runScraper}
                        disabled={running}
                        className="btn-premium btn-primary px-8 py-3 disabled:opacity-50 whitespace-nowrap"
                    >
                        {running ? '⏳ Ejecutando...' : '▶ Ejecutar Scraper'}
                    </button>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm text-text-muted">
                        <strong className="text-primary">Nota:</strong> El scraper buscará noticias nuevas y las agregará
                        a la cola de aprobación. Las noticias scrapeadas deben ser revisadas antes de publicarse.
                    </p>
                </div>
            </div>

            {/* Logs */}
            <div className="glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Historial de Ejecuciones</h2>
                    <button
                        onClick={fetchLogs}
                        className="text-primary hover:text-primary-light transition-colors text-sm font-medium"
                    >
                        ↻ Actualizar
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-12 text-text-muted">
                        No hay registros de ejecución
                    </div>
                ) : (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className={`p-4 rounded-xl border transition-all ${log.status === 'success'
                                        ? 'bg-green-500/5 border-green-500/20'
                                        : 'bg-red-500/5 border-red-500/20'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                                                }`}
                                        ></div>
                                        <div>
                                            <div className="font-bold text-sm">
                                                {log.source}
                                                <span
                                                    className={`ml-3 text-xs px-2 py-1 rounded ${log.status === 'success'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                        }`}
                                                >
                                                    {log.status === 'success' ? '✓ Exitoso' : '✗ Fallido'}
                                                </span>
                                            </div>
                                            <div className="text-xs text-text-muted mt-1">
                                                {new Date(log.started_at).toLocaleString('es-AR', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">{log.items_found}</div>
                                        <div className="text-xs text-text-muted">items encontrados</div>
                                    </div>
                                </div>
                                {log.error_message && (
                                    <div className="mt-3 text-xs text-red-400 bg-red-500/10 p-2 rounded">
                                        Error: {log.error_message}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
