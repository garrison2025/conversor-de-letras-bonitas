
import React from 'react';
import { FontCategory } from '../types';

interface FooterProps {
    onNavigate: (cat: FontCategory | 'blog') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Helper to handle navigation without reloading the page
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-slate-900/50 backdrop-blur-lg relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 block mb-4">
              LetrasBonitas
            </span>
            <p className="text-slate-500 font-light max-w-sm leading-relaxed">
              La suite definitiva para la transformación de tipografía digital. Diseñada para destacar en Instagram, Facebook, TikTok y más.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Categorías</h3>
            <ul className="space-y-3">
              {[
                { label: 'Cursivas', path: '#/letras-cursivas' },
                { label: 'Facebook', path: '#/letras-facebook' },
                { label: 'Tatuajes', path: '#/letras-tatuajes' },
                { label: 'Góticas', path: '#/letras-goticas' },
                { label: 'Amino', path: '#/letras-amino' },
                { label: 'Graffiti', path: '#/letras-graffiti' },
                { label: 'Blog', path: '#/blog' }, // Added Blog to Footer
              ].map((item) => (
                  <li key={item.label}>
                    <a 
                        href={item.path} 
                        onClick={(e) => handleLinkClick(e, item.path)}
                        className="text-slate-400 hover:text-pink-400 transition-colors text-sm cursor-pointer"
                    >
                        {item.label}
                    </a>
                  </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-3">
               <li>
                   <a 
                    href="#/sobre-nosotros" 
                    onClick={(e) => handleLinkClick(e, '#/sobre-nosotros')}
                    className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
                   >
                       Sobre Nosotros
                   </a>
               </li>
               <li>
                   <a 
                    href="#/contacto" 
                    onClick={(e) => handleLinkClick(e, '#/contacto')}
                    className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
                   >
                       Contacta con Nosotros
                   </a>
               </li>
               <li>
                   <a 
                    href="#/politica-de-privacidad" 
                    onClick={(e) => handleLinkClick(e, '#/politica-de-privacidad')}
                    className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
                   >
                       Política de Privacidad
                   </a>
               </li>
               <li>
                   <a 
                    href="#/terminos-de-servicio" 
                    onClick={(e) => handleLinkClick(e, '#/terminos-de-servicio')}
                    className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
                   >
                       Términos de Servicio
                   </a>
               </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-600">
          <p>© {new Date().getFullYear()} LetrasBonitas Pro. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Hecho con ♥ para creadores</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
