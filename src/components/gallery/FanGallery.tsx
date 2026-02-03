'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryPhoto {
    id: string;
    image_url: string;
    caption?: string;
    author_name: string;
    created_at: string;
    likes_count: number;
}

export default function FanGallery() {
    const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [formData, setFormData] = useState({ image_url: '', caption: '', author_name: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('/api/gallery?limit=50');
            const data = await response.json();
            setPhotos(data.data || []);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        setSuccessMessage('');

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setFormData({ image_url: '', caption: '', author_name: '' });
                setShowUploadForm(false);
                // Optionally refresh gallery
                // fetchPhotos();
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">
                        Galería <span className="premium-gradient">ARMY</span>
                    </h2>
                    <p className="text-text-muted">Fotos compartidas por la comunidad</p>
                </div>
                <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="btn-premium btn-primary px-6 py-3"
                >
                    {showUploadForm ? '✕ Cancelar' : '+ Compartir Foto'}
                </button>
            </div>

            {/* Upload Form */}
            {showUploadForm && (
                <div className="glass-card p-6 mb-8 animate-fade-in">
                    <h3 className="text-xl font-bold mb-4">Sube tu foto</h3>
                    {successMessage && (
                        <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-text-muted">
                                URL de la imagen *
                            </label>
                            <input
                                type="url"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-text-muted">
                                Descripción (opcional)
                            </label>
                            <input
                                type="text"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                maxLength={200}
                                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors"
                                placeholder="Describe tu foto..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-text-muted">
                                Tu nombre *
                            </label>
                            <input
                                type="text"
                                value={formData.author_name}
                                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                required
                                maxLength={50}
                                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors"
                                placeholder="Tu nombre ARMY"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="btn-premium btn-primary px-8 py-3 disabled:opacity-50"
                        >
                            {uploading ? 'Subiendo...' : 'Compartir Foto'}
                        </button>
                    </form>
                </div>
            )}

            {/* Gallery Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : photos.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-text-muted">No hay fotos en la galería aún</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={photo.image_url}
                                    alt={photo.caption || 'Fan photo'}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-white text-sm font-medium mb-1">{photo.author_name}</p>
                                        {photo.caption && (
                                            <p className="text-white/80 text-xs line-clamp-2">{photo.caption}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{photo.likes_count}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
