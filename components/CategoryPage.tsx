
import React, { useState, useEffect, useRef } from 'react';
import { FontCategory, RouteConfig } from '../types';
import { getFontsByCategory, SYMBOL_COLLECTIONS, AESTHETIC_PHRASES } from '../services/fontService';
import FontCard from './FontCard';
import { BLOG_POSTS } from '../data/blogPosts';

interface CategoryPageProps {
  config: RouteConfig;
}

// Expanded Decoration Types for Optimized Menus
type DecorationType = 'none' | 'sparkles' | 'hearts' | 'brackets' | 'stars' | 'moon' | 
                      'fire' | 'warning' | 'bricks' | 'crown' | 'spray' |
                      'swords' | 'bats' | 'chains' | 'barbed_wire' | 'angel' |
                      'flowers' | 'cherry' | 'musical' | 'cloud' |
                      'anchor' | 'needle';

type CaseType = 'normal' | 'upper' | 'lower' | 'capitalize';
type ViewMode = 'grid' | 'list';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

const CategoryTips: Record<string, string> = {
    [FontCategory.ALL]: "Tip Pro: Mezcla estilos (Negrita + Cursiva) para crear jerarquía visual en tus textos.",
    [FontCategory.CURSIVE]: "Tip Visual: Las cursivas funcionan mejor en minúsculas. Evita escribir todo en MAYÚSCULAS con estos estilos.",
    [FontCategory.TATTOO]: "Tip de Tatuaje: Evita estilos muy densos para tamaños pequeños; la tinta se expande con los años.",
    [FontCategory.GOTHIC]: "Tip Gamer: Los nicks góticos destacan más en la 'Kill Feed' de juegos como Free Fire.",
    [FontCategory.FACEBOOK]: "Tip de Marketing: Usa negritas solo en los titulares. El texto largo en negrita cansa la vista.",
    [FontCategory.GRAFFITI]: "Tip Urbano: Los estilos de burbuja ocupan más espacio horizontal, ideales para llamar la atención.",
    [FontCategory.AMINO]: "Tip Aesthetic: Usa marcos 【 】 para resaltar secciones importantes en tus blogs.",
};

const CATEGORY_MAP_TO_BLOG: Record<string, string[]> = {
    [FontCategory.ALL]: ['Tutoriales', 'Redes Sociales', 'Diseño'],
    [FontCategory.CURSIVE]: ['Tutoriales', 'Diseño'],
    [FontCategory.TATTOO]: ['Tatuajes'],
    [FontCategory.GOTHIC]: ['Gaming', 'Tatuajes'],
    [FontCategory.GRAFFITI]: ['Diseño', 'Redes Sociales'],
    [FontCategory.FACEBOOK]: ['Redes Sociales'],
    [FontCategory.AMINO]: ['Tutoriales', 'Redes Sociales']
};

// NEW: Quick Templates
const QUICK_TEMPLATES = [
    { label: 'Perfil Bio', text: 'Nombre | 📍 Ciudad | ♈ Signo', icon: '👤' },
    { label: 'Nick Gamer', text: '⚡ TuNick ⚡', icon: '🎮' },
    { label: 'Fecha', text: 'DD • MM • YYYY', icon: '📅' },
    { label: 'Amor', text: 'Nombre ∞ Nombre', icon: '❤️' },
    { label: 'Lista', text: '✨ Item 1 \n✨ Item 2 \n✨ Item 3', icon: '📝' },
];

const CategoryPage: React.FC<CategoryPageProps> = ({ config }) => {
  // PERSISTENCE: Initialize state from sessionStorage if available
  const [inputText, setInputText] = useState(() => {
      if (typeof window !== 'undefined') {
          return sessionStorage.getItem('global_input_text') || '';
      }
      return '';
  });
  
  const [debouncedText, setDebouncedText] = useState(inputText);
  const [isFocused, setIsFocused] = useState(false);
  const [decoration, setDecoration] = useState<DecorationType>('none');
  const [caseMode, setCaseMode] = useState<CaseType>('normal');
  const [pinnedFonts, setPinnedFonts] = useState<string[]>([]);
  const [recentHistory, setRecentHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [minReadability, setMinReadability] = useState<'all' | 'medium' | 'high'>('all');
  const [activeSymbolTab, setActiveSymbolTab] = useState(SYMBOL_COLLECTIONS[0].id);
  const [showTip, setShowTip] = useState(true);
  
  // UX State
  const [showScrollTop, setShowScrollTop] = useState(false); 
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Virtualization / Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(24);
  
  // Dynamic Placeholder State
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Hola", "Amor", "Música", "Arte", "2025", "Suerte", "Paz", "Letras"];
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              setVisibleCount(prev => prev + 24);
          }
      }, { threshold: 0.1 });

      if (loadMoreRef.current) {
          observer.observe(loadMoreRef.current);
      }

      return () => observer.disconnect();
  }, [debouncedText, searchTerm, config.category, minReadability]); 

  // Scroll Top Logic
  useEffect(() => {
      const handleScroll = () => {
          // Show scroll-to-top button after 500px
          setShowScrollTop(window.scrollY > 500);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  // Reset decoration & tip when category changes
  useEffect(() => {
      setVisibleCount(24); 
      setDecoration('none');
      setShowTip(true);
  }, [config.category]);

  useEffect(() => {
      sessionStorage.setItem('global_input_text', inputText);
  }, [inputText]);

  useEffect(() => {
    const savedPins = localStorage.getItem('pinned_fonts');
    if (savedPins) {
      try { setPinnedFonts(JSON.parse(savedPins)); } catch (e) { console.error('Failed to parse pinned'); }
    }

    const savedHistory = localStorage.getItem('copy_history');
    if (savedHistory) {
      try { setRecentHistory(JSON.parse(savedHistory)); } catch (e) { console.error('Failed to parse history'); }
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(inputText);
    }, 50);
    return () => clearTimeout(handler);
  }, [inputText]);

  useEffect(() => {
    if (inputText.length > 0) return; 
    
    const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, [inputText]);

  const standardFonts = getFontsByCategory(config.category);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
  };

  const handleCopyText = (text: string) => {
      showToast('Copiado al portapapeles', 'success');
      
      setRecentHistory(prev => {
          // Add to history if not duplicate of the very last item (simple check)
          // or filter existing to move to top
          const filtered = prev.filter(item => item !== text); 
          const newHistory = [text, ...filtered].slice(0, 10); // Keep last 10
          localStorage.setItem('copy_history', JSON.stringify(newHistory));
          return newHistory;
      });
  };

  const handleCopyInput = () => {
      if(!inputText) return;
      navigator.clipboard.writeText(inputText);
      showToast('Texto original copiado', 'success');
  };

  const restoreFromHistory = (text: string) => {
      setInputText(text);
      showToast('Restaurado al editor', 'info');
      setShowHistory(false);
  };

  const clearHistory = () => {
      setRecentHistory([]);
      localStorage.removeItem('copy_history');
      showToast('Historial borrado', 'info');
  };

  const togglePin = (fontId: string) => {
    let newPinned;
    const isPinning = !pinnedFonts.includes(fontId);
    
    if (pinnedFonts.includes(fontId)) {
      newPinned = pinnedFonts.filter(id => id !== fontId);
    } else {
      newPinned = [...pinnedFonts, fontId];
    }
    setPinnedFonts(newPinned);
    localStorage.setItem('pinned_fonts', JSON.stringify(newPinned));
    
    if (isPinning) showToast('Añadido a favoritos', 'success');
    else showToast('Eliminado de favoritos', 'info');
  };

  const handleClear = () => {
      setInputText('');
      if (textareaRef.current) textareaRef.current.focus();
  };
  
  const handlePaste = async () => {
    try {
        const text = await navigator.clipboard.readText();
        setInputText(text);
        showToast('Texto pegado', 'success');
    } catch (err) {
        showToast('Error al pegar', 'info');
    }
  };

  const handleRandomPhrase = () => {
      const phrase = AESTHETIC_PHRASES[Math.floor(Math.random() * AESTHETIC_PHRASES.length)];
      setInputText(phrase);
      showToast('✨ Frase mágica insertada');
  };

  // NEW: Scroll to Top Handler
  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Also focus the input
      setTimeout(() => {
          if (textareaRef.current) textareaRef.current.focus();
      }, 500);
  };

  const insertSymbol = (symbol: string) => {
    const el = textareaRef.current;
    if (el) {
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = inputText;
        const newText = text.substring(0, start) + symbol + text.substring(end);
        setInputText(newText);
        
        setTimeout(() => {
            el.selectionStart = el.selectionEnd = start + symbol.length;
            el.focus();
        }, 0);
    } else {
        setInputText(prev => prev + symbol);
    }
  };

  // OPTIMIZED: Smart Decorator Logic - Category Specific
  const getDecorationsForCategory = (cat: FontCategory): DecorationType[] => {
      switch(cat) {
          case FontCategory.AMINO:
              return ['none', 'sparkles', 'cloud', 'angel', 'hearts', 'moon', 'flowers', 'cherry', 'stars'];
          case FontCategory.GOTHIC:
              return ['none', 'swords', 'bats', 'chains', 'barbed_wire', 'moon', 'brackets'];
          case FontCategory.GRAFFITI:
              return ['none', 'brackets', 'fire', 'spray', 'warning', 'bricks', 'crown'];
          case FontCategory.TATTOO:
              return ['none', 'anchor', 'needle', 'moon', 'stars', 'musical', 'flowers'];
          default:
              return ['none', 'sparkles', 'hearts', 'brackets', 'stars', 'moon'];
      }
  };

  const toggleDecoration = () => {
    const modes = getDecorationsForCategory(config.category);
    let currentIndex = modes.indexOf(decoration);
    if (currentIndex === -1) currentIndex = 0;
    const nextIndex = (currentIndex + 1) % modes.length;
    setDecoration(modes[nextIndex]);
  };

  const toggleCase = () => {
    const modes: CaseType[] = ['normal', 'upper', 'lower', 'capitalize'];
    const nextIndex = (modes.indexOf(caseMode) + 1) % modes.length;
    setCaseMode(modes[nextIndex]);
  };

  const processText = (text: string): string => {
      let res = text;
      
      if (caseMode === 'upper') res = res.toUpperCase();
      else if (caseMode === 'lower') res = res.toLowerCase();
      else if (caseMode === 'capitalize') {
          res = res.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }

      return res;
  };

  const applyDecoration = (text: string): string => {
      if (!text) return text;
      switch (decoration) {
          case 'sparkles': return `✨ ${text} ✨`;
          case 'hearts': return `♥ ${text} ♥`;
          case 'brackets': return `【 ${text} 】`;
          case 'stars': return `★ ${text} ★`;
          case 'moon': return `☾ ${text} ☽`;
          case 'cloud': return `☁ ${text} ☁`;
          case 'angel': return `ଘ(੭*ˊᵕˋ)੭* ੈ♡‧₊˚ ${text}`;
          case 'flowers': return `❀ ${text} ❀`;
          case 'cherry': return `🍒 ${text} 🍒`;
          case 'musical': return `♫ ${text} ♫`;
          case 'swords': return `⚔️ ${text} ⚔️`;
          case 'bats': return `🦇 ${text} 🦇`;
          case 'chains': return `⛓ ${text} ⛓`;
          case 'barbed_wire': return `༒ ${text} ༒`;
          case 'fire': return `🔥 ${text} 🔥`;
          case 'warning': return `⚠️ ${text} ⚠️`;
          case 'bricks': return `🧱 ${text} 🧱`;
          case 'spray': return `░▒▓ ${text} ▓▒░`;
          case 'crown': return `♛ ${text} ♛`;
          case 'anchor': return `⚓ ${text} ⚓`;
          case 'needle': return `✒ ${text} ✒`;
          default: return text;
      }
  };

  const filteredFonts = standardFonts.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesReadability = minReadability === 'all' 
          ? true 
          : minReadability === 'medium' 
              ? (f.readability === 'medium' || f.readability === 'high')
              : f.readability === 'high';
      return matchesSearch && matchesReadability;
  });

  const sortedFonts = [...filteredFonts].sort((a, b) => {
    const aPinned = pinnedFonts.includes(a.id);
    const bPinned = pinnedFonts.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0; 
  });

  const displayedFonts = sortedFonts.slice(0, visibleCount);

  // Keyword optimization helper logic
  const getSearchPlaceholder = () => {
      if (config.category === FontCategory.ALL) return "Escribe aquí para usar el conversor de letras bonitas...";
      if (config.category === FontCategory.CURSIVE) return "Buscar en el conversor de letras cursivas...";
      if (config.category === FontCategory.FACEBOOK) return "Escribe aquí para usar el conversor de letras para Facebook...";
      if (config.category === FontCategory.AMINO) return "Buscar estilo en el conversor de letras Amino...";
      return "Buscar estilo...";
  }

  const getNoResultsMessage = () => {
      if (config.category === FontCategory.ALL) return "No se encontraron resultados en el conversor de letras bonitas.";
      if (config.category === FontCategory.CURSIVE) return "No se encontraron estilos en el conversor de letras cursivas.";
      if (config.category === FontCategory.FACEBOOK) return "No se encontraron resultados en el conversor de letras para Facebook.";
      if (config.category === FontCategory.AMINO) return "No se encontraron resultados en el conversor de letras Amino.";
      return "No se encontraron estilos con los filtros actuales.";
  }

  // Get related posts based on current category
  const relatedPosts = BLOG_POSTS.filter(post => 
      CATEGORY_MAP_TO_BLOG[config.category]?.includes(post.category)
  ).slice(0, 3); // Limit to 3

  return (
    <div className="pt-32 pb-24 relative min-h-screen">
      
      {/* Toast Container */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => (
              <div key={toast.id} className="animate-fade-in-up bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-3">
                  {toast.type === 'success' ? <span className="text-emerald-400">✓</span> : <span className="text-blue-400">ℹ</span>}
                  <span className="font-medium text-sm">{toast.message}</span>
              </div>
          ))}
      </div>

      {/* NEW: Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
            fixed bottom-6 right-6 z-40 bg-pink-600 hover:bg-pink-500 text-white w-12 h-12 rounded-full shadow-lg border border-white/10 flex items-center justify-center transition-all duration-300
            ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        aria-label="Volver arriba"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* SEO Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4 font-medium animate-fade-in">
            <a href="#/" className="hover:text-white transition-colors">Inicio</a>
            <span className="text-slate-700">/</span>
            {config.category !== FontCategory.ALL ? (
                <>
                    <span className="text-pink-500">{config.title.split(' - ')[0]}</span>
                </>
            ) : (
                <span className="text-pink-500">Todas las Fuentes</span>
            )}
        </div>

        {/* Dynamic Pro Tip Banner */}
        {showTip && CategoryTips[config.category] && (
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
                <div className="bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 rounded-full px-4 py-2 flex items-center justify-between text-xs md:text-sm">
                    <span className="flex items-center gap-2 text-indigo-300">
                        <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">TIP</span>
                        {CategoryTips[config.category]}
                    </span>
                    <button onClick={() => setShowTip(false)} className="text-slate-500 hover:text-white ml-4">✕</button>
                </div>
            </div>
        )}

        {/* Header - No height change on scroll, just opacity */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {config.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-amber-500' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                {config.description}
            </p>
        </div>

        {/* Input Wrapper - STATIC POSITION (No Sticky) */}
        <div className="max-w-4xl mx-auto mb-16 z-30 relative">
             <div className={`
                relative rounded-3xl transition-all duration-300 ease-out p-[1px]
                ${isFocused
                    ? 'bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 shadow-[0_0_50px_-10px_rgba(236,72,153,0.3)]' 
                    : 'bg-white/10 hover:bg-white/20'}
             `}>
                <div className="bg-slate-900/95 backdrop-blur-xl rounded-[23px] overflow-hidden relative flex flex-col shadow-2xl">
                    <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Escribe tu frase aquí..."
                        className="w-full bg-transparent p-6 md:p-8 font-bold text-white placeholder-slate-600 outline-none resize-none leading-snug text-center text-2xl md:text-4xl min-h-[120px]"
                        rows={1}
                        spellCheck={false}
                    />

                    {/* Random Dice Button */}
                    <button 
                        onClick={handleRandomPhrase}
                        title="¡Sorpréndeme!"
                        className={`absolute right-4 top-4 md:right-8 md:top-8 p-2 text-2xl text-slate-500 hover:text-pink-400 hover:scale-110 transition-all z-20 ${inputText.length > 0 ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'}`}
                    >
                        🎲
                    </button>

                    {/* Text Statistics Bar */}
                    <div className="flex items-center justify-center gap-6 px-4 py-2 bg-black/20 text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-widest border-t border-white/5">
                        <span className="flex items-center gap-1">
                            <span className="text-pink-500 font-bold">{inputText.length}</span> Caracteres
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-indigo-500 font-bold">{inputText.trim().split(/\s+/).filter(w => w.length > 0).length}</span> Palabras
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-emerald-500 font-bold">{inputText.split(/\r\n|\r|\n/).length}</span> Líneas
                        </span>
                    </div>
                    
                    {/* Toolbar */}
                    <div>
                        
                        {/* NEW: Quick Templates Toolbar */}
                        <div className="bg-slate-900/50 border-t border-white/5 py-2">
                            <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar px-4">
                                {QUICK_TEMPLATES.map((tmpl, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setInputText(tmpl.text);
                                            showToast('Plantilla aplicada');
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white hover:border-pink-500/30 transition-all whitespace-nowrap group"
                                    >
                                        <span className="text-base group-hover:scale-110 transition-transform">{tmpl.icon}</span>
                                        {tmpl.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Symbol Library (Tabbed) */}
                        <div className="bg-slate-900/50 border-t border-white/5">
                            {/* Tabs */}
                            <div className="flex overflow-x-auto no-scrollbar border-b border-white/5">
                                {SYMBOL_COLLECTIONS.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveSymbolTab(cat.id)}
                                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors
                                            ${activeSymbolTab === cat.id ? 'text-white bg-white/10' : 'text-slate-500 hover:text-slate-300'}
                                        `}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                            {/* Symbol Grid */}
                            <div className="flex items-center gap-2 px-6 py-3 overflow-x-auto no-scrollbar justify-start md:justify-center bg-black/10 min-h-[50px]">
                                {SYMBOL_COLLECTIONS.find(c => c.id === activeSymbolTab)?.items.map(sym => (
                                    <button
                                        key={sym}
                                        onClick={() => insertSymbol(sym)}
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-300 hover:bg-pink-500 hover:text-white transition-all text-sm md:text-base"
                                    >{sym}</button>
                                ))}
                            </div>
                        </div>

                        {/* History Panel (Conditional) */}
                        {showHistory && (
                            <div className="bg-slate-900 border-t border-white/5 p-4 animate-fade-in">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Historial Reciente</span>
                                    <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-300">Borrar Todo</button>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                                    {recentHistory.length === 0 && <p className="text-center text-slate-600 text-sm py-4">No hay historial reciente</p>}
                                    {recentHistory.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <button 
                                                onClick={() => restoreFromHistory(item)}
                                                className="flex-1 text-left bg-white/5 hover:bg-white/10 p-2 rounded-lg text-sm text-slate-300 truncate transition-colors"
                                            >
                                                {item}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-white/5 bg-black/20 gap-3">
                             <div className="flex gap-2 w-full md:w-auto">
                                <button onClick={handlePaste} className="flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                    Pegar
                                </button>
                                <button onClick={handleCopyInput} className="flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                    Copiar
                                </button>
                                <button onClick={() => setShowHistory(!showHistory)} className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${showHistory ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                                    Historial
                                </button>
                                <button onClick={handleClear} className="flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors">
                                    Borrar
                                </button>
                             </div>
                             
                             <div className="flex gap-2 w-full md:w-auto">
                                <button onClick={toggleDecoration} className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${decoration !== 'none' ? 'bg-pink-500/20 text-pink-300 border-pink-500/50' : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'}`}>
                                    {decoration === 'none' ? 'Decorar' : 'Decorado'}
                                </button>
                                <button onClick={toggleCase} className="flex-1 md:flex-none w-auto md:w-12 px-0 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                    {caseMode === 'normal' ? 'Aa' : caseMode === 'upper' ? 'AA' : 'aa'}
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Filters Bar - Fixed below sticky input if needed, currently static */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative w-full md:max-w-xs group flex-1">
                    <input
                        type="text"
                        placeholder={getSearchPlaceholder()}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-slate-300 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />
                </div>
                {/* Readability Filter */}
                <select 
                    value={minReadability} 
                    onChange={(e) => setMinReadability(e.target.value as any)}
                    className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl focus:ring-pink-500 focus:border-pink-500 block p-2.5 outline-none"
                >
                    <option value="all">Todas</option>
                    <option value="medium">Legibles</option>
                    <option value="high">Muy Claras</option>
                </select>
            </div>
            
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
        </div>

        {/* Results Grid/List (Virtualization via Pagination) */}
        <ul className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col max-w-4xl mx-auto'}`}>
           {displayedFonts.map((font) => {
               const isZeroState = debouncedText.length === 0;
               const currentPlaceholder = placeholders[placeholderIndex];
               const processedInput = processText(isZeroState ? currentPlaceholder : debouncedText);
               const rawResult = font.converter(processedInput);
               const finalResult = applyDecoration(rawResult);
               const isPinned = pinnedFonts.includes(font.id);

               return (
                 <FontCard 
                    key={font.id} 
                    id={font.id}
                    name={font.name} 
                    result={finalResult}
                    originalText={processedInput}
                    isPinned={isPinned}
                    onTogglePin={() => togglePin(font.id)}
                    isListView={viewMode === 'list'}
                    onCopy={handleCopyText}
                 />
               );
           })}
        </ul>

        {/* Infinite Scroll Sentinel */}
        {displayedFonts.length < sortedFonts.length && (
            <div ref={loadMoreRef} className="py-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        )}
        
        {/* No Results */}
        {sortedFonts.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-slate-700">
                <p className="text-slate-400 mb-2">{getNoResultsMessage()}</p>
                <p className="text-slate-500 text-sm">Prueba buscando: "Negrita", "Círculos", "Tachado"</p>
                <button onClick={() => {setSearchTerm(''); setMinReadability('all');}} className="mt-4 text-pink-400 hover:underline">Limpiar filtros</button>
             </div>
        )}

        {/* Contextual Related Posts (New Feature) */}
        {relatedPosts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-2xl">📚</span>
                    <h3 className="text-xl font-bold text-white">Artículos Relacionados</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(post => (
                        <a 
                            key={post.id}
                            href={`#/blog/${post.slug}`}
                            className="group block bg-slate-900 border border-white/5 rounded-xl overflow-hidden hover:border-pink-500/30 transition-all hover:-translate-y-1"
                        >
                            <div className={`h-32 bg-gradient-to-br ${post.coverGradient} flex items-center justify-center relative`}>
                                <div className="absolute inset-0 bg-black/20"></div>
                                <span className="text-4xl relative z-10">{post.category === 'Tutoriales' ? '📱' : post.category === 'Tatuajes' ? '🐉' : '🎨'}</span>
                            </div>
                            <div className="p-5">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                                <h4 className="text-white font-bold leading-tight group-hover:text-pink-400 transition-colors line-clamp-2">{post.title}</h4>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
