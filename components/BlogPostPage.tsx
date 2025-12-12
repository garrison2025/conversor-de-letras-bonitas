
import React, { useEffect } from 'react';
import { BlogPost } from '../types';

interface BlogPostPageProps {
    post: BlogPost;
    onNavigate: (path: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigate }) => {

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback copy
            navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado al portapapeles');
        }
    };

    // Helper to handle internal links in content
    const handleInternalClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A') {
            const href = target.getAttribute('href');
            if (href && href.startsWith('#/')) {
                e.preventDefault();
                onNavigate(href);
            }
        }
    };

    return (
        <div className="pt-32 pb-24 relative min-h-screen">
             {/* Progress Bar (Mock) */}
             <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 z-[10001] w-full animate-fade-in"></div>

             <div className="max-w-3xl mx-auto px-6 relative z-10">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-mono">
                    <a href="#/" onClick={(e) => {e.preventDefault(); onNavigate('#/');}} className="hover:text-emerald-400">Inicio</a>
                    <span>/</span>
                    <a href="#/blog" onClick={(e) => {e.preventDefault(); onNavigate('#/blog');}} className="hover:text-emerald-400">Blog</a>
                    <span>/</span>
                    <span className="text-slate-300 truncate max-w-[150px]">{post.category}</span>
                </div>

                {/* Article Header */}
                <header className="mb-12 text-center">
                    <div className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
                        <span className="flex items-center gap-2">
                            🗓 {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            ✍️ {post.author}
                        </span>
                    </div>
                </header>

                {/* Article Content */}
                <article 
                    className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl ring-1 ring-white/5"
                    onClick={handleInternalClick}
                >
                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed 
                        prose-headings:text-white prose-headings:font-bold 
                        prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline 
                        prose-strong:text-white prose-li:marker:text-emerald-500
                        prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
                    >
                        {post.content}
                    </div>

                    {/* Interaction Bar */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="text-slate-500 text-sm">
                            ¿Te sirvió este artículo?
                        </div>
                        <button 
                            onClick={handleShare}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Compartir
                        </button>
                    </div>
                </article>

                {/* CTA - Conversion Driver */}
                <div className="mt-16 bg-gradient-to-r from-indigo-900/50 to-pink-900/50 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">¡Ponlo en práctica ahora!</h3>
                    <p className="text-slate-300 mb-6 relative z-10">
                        Usa nuestro generador gratuito para crear las letras que acabas de ver en este artículo.
                    </p>
                    <a 
                        href="#/" 
                        onClick={(e) => {e.preventDefault(); onNavigate('#/');}}
                        className="inline-flex relative z-10 items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-white/10"
                    >
                        ✨ Ir al Conversor
                    </a>
                </div>

             </div>
        </div>
    );
};

export default BlogPostPage;
