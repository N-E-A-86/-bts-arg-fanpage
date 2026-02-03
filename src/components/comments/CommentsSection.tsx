'use client';

import { useState, useEffect } from 'react';

interface Comment {
    id: string;
    author_name: string;
    content: string;
    created_at: string;
    is_approved: boolean;
}

interface CommentsProps {
    newsId: string;
}

export default function CommentsSection({ newsId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ author_name: '', content: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchComments();
    }, [newsId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?news_id=${newsId}`);
            const data = await response.json();
            setComments(data.data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMessage('');

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    news_id: newsId,
                    ...formData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setFormData({ author_name: '', content: '' });
                // Optionally refresh comments
                // fetchComments();
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">
                Comentarios <span className="text-primary">({comments.length})</span>
            </h3>

            {/* Comment Form */}
            <div className="glass-card p-6 mb-8">
                <h4 className="text-lg font-bold mb-4">Deja tu comentario</h4>
                {successMessage && (
                    <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="author_name" className="block text-sm font-medium mb-2 text-text-muted">
                            Tu nombre
                        </label>
                        <input
                            type="text"
                            id="author_name"
                            value={formData.author_name}
                            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                            required
                            maxLength={50}
                            className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors"
                            placeholder="Ingresa tu nombre ARMY"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium mb-2 text-text-muted">
                            Comentario
                        </label>
                        <textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            minLength={3}
                            maxLength={1000}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-glass-border focus:border-primary/50 outline-none transition-colors resize-none"
                            placeholder="Comparte tu opinión..."
                        />
                        <div className="text-xs text-text-muted mt-1 text-right">
                            {formData.content.length}/1000
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-premium btn-primary px-8 py-3 disabled:opacity-50"
                    >
                        {submitting ? 'Enviando...' : 'Enviar Comentario'}
                    </button>
                </form>
            </div>

            {/* Comments List */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : comments.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-text-muted">Sé el primero en comentar</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="glass-card p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <span className="text-sm font-bold text-primary">
                                            {comment.author_name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{comment.author_name}</div>
                                        <div className="text-xs text-text-muted">
                                            {new Date(comment.created_at).toLocaleDateString('es-AR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-text-muted leading-relaxed">{comment.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
