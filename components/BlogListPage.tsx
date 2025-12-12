
import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';

interface BlogListPageProps {
    onNavigate: (path: string) => void;
}

const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const handleArticleClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        onNavigate(`#/blog/${slug}`);
    };

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(BLOG_POSTS.map(p => p.category));
        return ['Todas', ...Array.from(cats)];
    }, []);

    // Filter Logic
    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="pt-32 pb-24 relative min-h-screen">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block h-1 w-20 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mb-6 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Blog & Tutoriales
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Descubre trucos de tipografía, guías para redes sociales y las últimas tendencias en personalización digital.
                    </p>
                </div>

                {/* Controls: Search & Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                    
                    {/* Categories Scroll */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    selectedCategory === cat 
                                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg' 
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Buscar artículo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <svg className="w-5 h-5 text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article 
                                key={post.id} 
                                className="group bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
                            >
                                {/* Dynamic Decorative Top Bar (Based on post.coverGradient) */}
                                <div className={`h-48 bg-gradient-to-br ${post.coverGradient || 'from-slate-800 to-slate-900'} group-hover:brightness-110 transition-all duration-500 relative flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 bg-[url('https://letrasbonitas.pro/checkered.png')] opacity-10 mix-blend-overlay"></div>
                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500 drop-shadow-lg filter">
                                        {post.category === 'Tutoriales' ? '📱' : post.category === 'Tatuajes' ? '🐉' : post.category === 'Gaming' ? '🎮' : post.category === 'Diseño' ? '🎨' : '📝'}
                                    </span>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-black/30 backdrop-blur-md text-white/90 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-slate-500 text-xs mb-3 font-mono flex items-center gap-2">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.author}</span>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-pink-300 transition-colors">
                                        <a href={`#/blog/${post.slug}`} onClick={(e) => handleArticleClick(e, post.slug)}>
                                            {post.title}
                                        </a>
                                    </h2>
                                    
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <a 
                                            href={`#/blog/${post.slug}`}
                                            onClick={(e) => handleArticleClick(e, post.slug)}
                                            className="text-white font-medium text-sm flex items-center gap-2 group/link"
                                        >
                                            Leer artículo completo 
                                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <span className="text-4xl block mb-4">🔍</span>
                        <p className="text-slate-400">No se encontraron artículos con estos criterios.</p>
                        <button onClick={() => {setSearchTerm(''); setSelectedCategory('Todas');}} className="mt-4 text-emerald-400 hover:underline">
                            Limpiar filtros
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BlogListPage;
