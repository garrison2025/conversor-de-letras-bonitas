import React, { useState, useEffect } from 'react';
import { FontCategory } from '../types';

interface NavbarProps {
  currentCategory: FontCategory | 'blog'; // Expanded type for Blog
  onNavigate: (category: FontCategory | 'blog') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentCategory, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Defined with explicit paths for SEO crawling
  const links = [
    { id: FontCategory.ALL, label: 'Inicio', icon: '✨', path: '#/' },
    { id: FontCategory.CURSIVE, label: 'Cursivas', icon: '✍️', path: '#/letras-cursivas' },
    { id: FontCategory.FACEBOOK, label: 'Facebook', icon: '📘', path: '#/letras-facebook' },
    { id: FontCategory.TATTOO, label: 'Tatuajes', icon: '🐉', path: '#/letras-tatuajes' },
    { id: FontCategory.GOTHIC, label: 'Góticas', icon: '🏰', path: '#/letras-goticas' },
    { id: FontCategory.GRAFFITI, label: 'Graffiti', icon: '🎨', path: '#/letras-graffiti' },
    { id: FontCategory.AMINO, label: 'Amino', icon: '💎', path: '#/letras-amino' },
    { id: 'blog', label: 'Blog', icon: '📰', path: '#/blog' }, // Added Blog Link
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.location.hash = path;
    setIsOpen(false);
  };

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-[9999] transition-all duration-300
      ${scrolled && !isOpen 
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-4'}
    `}>
      {/* 
        Header Content (Logo + Toggle) 
        Must have higher z-index than the full-screen menu overlay 
      */}
      <div className="max-w-[1400px] mx-auto px-6 relative z-[10000]">
        <div className="flex items-center justify-between relative">
          
          {/* Logo Section */}
          <a 
            href="#/"
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            onClick={(e) => handleLinkClick(e, '#/')}
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="font-bold text-xl text-white">L</span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className={`font-bold text-xl tracking-tight leading-none transition-colors ${isOpen ? 'text-white' : 'text-white group-hover:text-pink-200'}`}>
                LetrasBonitas
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Pro Studio
              </span>
            </div>
          </a>
          
          {/* Desktop Menu - Centered Capsule */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner shadow-black/20">
            {links.map((link) => {
              const isActive = currentCategory === link.id;
              
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`
                    relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer
                    ${isActive 
                      ? 'text-white shadow-lg shadow-pink-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full -z-10 animate-fade-in"></div>
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className={`p-2 transition-colors rounded-lg active:scale-95 touch-manipulation cursor-pointer border border-transparent 
                ${isOpen ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              type="button"
            >
              {isOpen ? (
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 
        Full Screen Mobile Menu Overlay 
        Conditional rendering ensures it doesn't break layout if CSS is missing
      */}
      {isOpen && (
        <div className={`
          lg:hidden fixed inset-0 bg-slate-950 z-[9995] transition-all duration-300 ease-in-out
          opacity-100 visible
        `}>
          {/* Background blobs for aesthetics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="h-full overflow-y-auto pt-32 pb-10 px-6">
              <div className="flex flex-col gap-3 max-w-md mx-auto">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Navegación</span>
                  {links.map((link, index) => {
                      const isActive = currentCategory === link.id;
                      return (
                        <a
                          key={link.id}
                          href={link.path}
                          onClick={(e) => handleLinkClick(e, link.path)}
                          className={`
                            w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer
                            ${isActive 
                              ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg shadow-pink-500/20 translate-x-2' 
                              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:translate-x-1'}
                          `}
                          style={{
                              transitionDelay: `${index * 50}ms`
                          }}
                        >
                          <span className="text-2xl w-10 h-10 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm">
                              {link.icon}
                          </span>
                          <span className="font-bold text-lg">{link.label}</span>
                          
                          {isActive && (
                              <svg className="w-5 h-5 ml-auto text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                          )}
                        </a>
                      )
                  })}
                  
                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                      <p className="text-slate-500 text-sm">© LetrasBonitas Pro Studio</p>
                  </div>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;