
import React, { useState, useEffect, useRef } from 'react';
import { FontCategory, RouteConfig, ReadabilityLevel } from '../types';
import { getFontsByCategory } from '../services/fontService';
import FontCard from './FontCard';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [minReadability, setMinReadability] = useState<'all' | 'medium' | 'high'>('all');
  
  // UX State
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Virtualization / Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(24);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
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
  }, [debouncedText, searchTerm, config.category, minReadability]); // Reset observer when content structure changes

  // Sticky Header Logic
  useEffect(() => {
      const handleScroll = () => {
          if (stickyRef.current) {
              const rect = stickyRef.current.getBoundingClientRect();
              setIsSticky(rect.top <= 85); // 80px is top-20 roughly
          }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset decoration when category changes
  useEffect(() => {
      setVisibleCount(24); // Reset infinite scroll
      setDecoration('none');
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
  const isSocialBio = inputText.length > 150; 

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
          const filtered = prev.filter(item => item !== text); 
          const newHistory = [text, ...filtered].slice(0, 5); 
          localStorage.setItem('copy_history', JSON.stringify(newHistory));
          return newHistory;
      });
  };

  const handleRestoreHistory = (text: string) => {
      navigator.clipboard.writeText(text);
      setInputText(text); // Also restore to input for UX
      showToast('Restaurado y Copiado', 'success');
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
  const commonSymbols = ['★', '♥', '⚡', '♛', '☠', '✈', '♫', '☁', '✿', '☾', '➤', '⚓', '⚔'];

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

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header - Hides on very small screens if sticky active could be considered, but simplified here */}
        <div className={`flex flex-col items-center justify-center text-center mb-12 ${isSticky ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100 transition-all duration-300'}`}>
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

        {/* Sticky Input Wrapper */}
        <div 
            ref={stickyRef}
            className={`
                max-w-4xl mx-auto mb-16 relative z-30 transition-all duration-500 ease-in-out
                ${isSticky ? 'sticky top-[85px]' : ''}
            `}
        >
             <div className={`
                relative rounded-3xl transition-all duration-300 ease-out p-[1px]
                ${isFocused || isSticky
                    ? 'bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 shadow-[0_0_50px_-10px_rgba(236,72,153,0.3)]' 
                    : 'bg-white/10 hover:bg-white/20'}
             `}>
                <div className={`bg-slate-900/95 backdrop-blur-xl rounded-[23px] overflow-hidden relative flex flex-col shadow-2xl transition-all duration-500 ${isSticky ? 'scale-[0.98]' : ''}`}>
                    <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Escribe tu frase aquí..."
                        className={`
                            w-full bg-transparent p-4 md:p-8 font-bold text-white placeholder-slate-600 outline-none resize-none leading-snug text-center transition-all duration-500
                            ${isSticky ? 'text-xl py-4 min-h-[60px]' : 'text-2xl md:text-4xl pb-4 min-h-[120px]'}
                        `}
                        rows={1}
                        spellCheck={false}
                    />
                    
                    {/* Collapsible Toolbar for Sticky Mode */}
                    <div className={`overflow-hidden transition-all duration-500 ${isSticky ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}>
                        {/* Quick Symbols Bar */}
                        <div className="flex items-center gap-2 px-6 pb-2 overflow-x-auto no-scrollbar justify-start md:justify-center">
                            {commonSymbols.map(sym => (
                                <button
                                    key={sym}
                                    onClick={() => insertSymbol(sym)}
                                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all text-xl"
                                >{sym}</button>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-white/5 bg-black/20 gap-3">
                             <div className="flex gap-2">
                                <button onClick={handlePaste} className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-400 hover:text-white transition-colors">Pegar</button>
                                <button onClick={() => setInputText('')} className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">Borrar</button>
                             </div>
                             
                             <div className="flex gap-2">
                                <button onClick={toggleDecoration} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${decoration !== 'none' ? 'bg-pink-500/20 text-pink-300 border-pink-500/50' : 'bg-white/5 text-slate-400 border-transparent'}`}>
                                    {decoration === 'none' ? 'Decorar' : 'Decorado'}
                                </button>
                                <button onClick={toggleCase} className="w-10 px-0 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/5 text-slate-400">
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
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
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
                <p className="text-slate-400">{getNoResultsMessage()}</p>
                <button onClick={() => {setSearchTerm(''); setMinReadability('all');}} className="mt-4 text-pink-400 hover:underline">Limpiar filtros</button>
             </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
