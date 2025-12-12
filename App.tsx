
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import InfoPage from './components/InfoPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import { FontCategory, RouteConfig } from './types';
import { ABOUT_CONTENT, CONTACT_CONTENT, PRIVACY_CONTENT, TERMS_CONTENT } from './data/staticContent';
import { BLOG_POSTS } from './data/blogPosts';
import { SEO_DATA } from './data/seoContent';

const App: React.FC = () => {
  // Use pathname instead of hash
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      window.scrollTo(0, 0);
      
      // --- DYNAMIC SEO ENGINE ---
      // Clean path is just the pathname now
      const clean = path === '/' ? '/' : path.endsWith('/') ? path.slice(0, -1) : path;

      // Special Handling for Blog Routes
      if (clean.startsWith('/blog/')) {
          const slug = clean.replace('/blog/', '');
          const post = BLOG_POSTS.find(p => p.slug === slug);
          
          if (post) {
              document.title = `${post.title} - Blog LetrasBonitas`;
              updateMeta('description', post.excerpt);
              // Open Graph
              updateMeta('og:title', post.title, true);
              updateMeta('og:description', post.excerpt, true);
          }
      } else if (clean === '/blog') {
          document.title = 'Blog y Tutoriales - Conversor de Letras Bonitas';
          updateMeta('description', 'Lee nuestros tutoriales sobre cómo cambiar fuentes en Instagram, Free Fire y más.');
      } else {
          // Standard Routes
          const route = routes[clean] || routes['/'];
          document.title = `${route.title} - LetrasBonitas Pro`;
          updateMeta('description', route.description);
          // Open Graph
          updateMeta('og:title', route.title, true);
          updateMeta('og:description', route.description, true);
      }
      
      // Update: Correct domain for Canonical and OG URLs
      const fullUrl = `https://conversordeletrasbonitas.org${clean === '/' ? '' : clean}`;
      updateMeta('og:url', fullUrl, true);
      updateMeta('twitter:url', fullUrl, true);

      // 4. Update Canonical Tag
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', fullUrl);
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);
    // Custom event for internal navigation
    window.addEventListener('pushstate', handleLocationChange);
    
    // Initial run
    handleLocationChange();

    return () => {
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  // Helper to update/create meta tags
  const updateMeta = (name: string, content: string, property: boolean = false) => {
      const key = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${key}="${name}"]`);
      if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(key, name);
          document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
  };

  const routes: Record<string, RouteConfig> = {
    '/': {
      path: '/',
      title: 'Conversor de Letras Bonitas',
      description: 'El mejor conversor de letras bonitas y fuentes para Instagram, Twitter y más. Copia y pega estilos únicos con símbolos.',
      category: FontCategory.ALL
    },
    '/letras-cursivas': {
      path: '/letras-cursivas',
      title: 'Conversor de Letras Cursivas',
      description: 'Utiliza nuestro conversor de letras cursivas para generar textos elegantes y manuscritos. Copia y pega fuentes cursivas aesthetic en redes sociales.',
      category: FontCategory.CURSIVE,
      isPowerPage: true
    },
    '/letras-tatuajes': {
      path: '/letras-tatuajes',
      title: 'Conversor de Letras para Tatuajes',
      description: 'Inspírate con el conversor de letras tattoo y tatuajes. Encuentra estilos de tatuajes cursiva, old school, runas y góticas.',
      category: FontCategory.TATTOO
    },
    '/letras-goticas': {
      path: '/letras-goticas',
      title: 'Conversor de Letras Góticas',
      description: 'Transforma tu texto con el conversor de letras góticas. Perfecto para nickames oscuros, vampíricos y letras góticas para tatuajes.',
      category: FontCategory.GOTHIC
    },
    '/letras-graffiti': {
      path: '/letras-graffiti',
      title: 'Conversor de Letras Graffiti',
      description: 'Crea arte urbano digital. Conversor de letras graffiti para diseños callejeros, bubble letters y estilos modernos.',
      category: FontCategory.GRAFFITI
    },
    '/letras-facebook': {
      path: '/letras-facebook',
      title: 'Conversor de Letras para Facebook',
      description: 'El mejor conversor de letras para Facebook. Genera fuentes, negritas, tachado y letras bonitas para destacar en tus estados y comentarios.',
      category: FontCategory.FACEBOOK
    },
    '/letras-amino': {
      path: '/letras-amino',
      title: 'Conversor de Letras Amino',
      description: 'El conversor de letras Amino definitivo. Decora tus blogs, chats y perfiles con marcos, bordes y símbolos aesthetic únicos.',
      category: FontCategory.AMINO
    },
    // INFO PAGES
    '/sobre-nosotros': {
      path: '/sobre-nosotros',
      title: 'Sobre Nosotros - Conversor de Letras Bonitas',
      description: 'Conoce la misión y el equipo detrás de conversordeletrasbonitas.org.',
      category: FontCategory.ALL,
      isStatic: true,
      content: ABOUT_CONTENT
    },
    '/contacto': {
      path: '/contacto',
      title: 'Contacto - Conversor de Letras Bonitas',
      description: 'Ponte en contacto con nuestro equipo de soporte.',
      category: FontCategory.ALL,
      isStatic: true,
      content: CONTACT_CONTENT
    },
    '/politica-de-privacidad': {
        path: '/politica-de-privacidad',
        title: 'Política de Privacidad - Conversor de Letras Bonitas',
        description: 'Cómo protegemos tus datos y privacidad.',
        category: FontCategory.ALL,
        isStatic: true,
        content: PRIVACY_CONTENT
    },
    '/terminos-de-servicio': {
        path: '/terminos-de-servicio',
        title: 'Términos de Servicio - Conversor de Letras Bonitas',
        description: 'Condiciones de uso de nuestra herramienta.',
        category: FontCategory.ALL,
        isStatic: true,
        content: TERMS_CONTENT
    }
  };

  const cleanPath = currentPath === '/' ? '/' : currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  
  const handleNavigate = (pathOrCat: string | FontCategory) => {
      let targetPath = '/';
      
      // Determine if it's a category or a full path
      if (typeof pathOrCat === 'string' && pathOrCat.startsWith('/')) {
          targetPath = pathOrCat;
      } else if (pathOrCat === 'blog') {
          targetPath = '/blog';
      } else {
          const entry = Object.values(routes).find(r => r.category === pathOrCat && !r.isStatic);
          if (entry) {
            targetPath = entry.path;
          }
      }

      // History API Navigation
      window.history.pushState({}, '', targetPath);
      // Dispatch custom event so App component knows to re-render
      window.dispatchEvent(new Event('pushstate'));
  };

  // Router Logic Render
  let ContentToRender;
  let activeCategory = FontCategory.ALL;
  let activeSeoContent = null;
  const activeRoute = routes[cleanPath] || routes['/']; // Default for meta

  if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      const post = BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
          ContentToRender = <BlogPostPage post={post} onNavigate={handleNavigate} />;
      } else {
          // 404 Fallback to Blog List
          ContentToRender = <BlogListPage onNavigate={handleNavigate} />;
      }
      activeCategory = 'blog' as any;
  } else if (cleanPath === '/blog') {
      ContentToRender = <BlogListPage onNavigate={handleNavigate} />;
      activeCategory = 'blog' as any;
  } else if (activeRoute.isStatic) {
      ContentToRender = <InfoPage title={activeRoute.title.split(' - ')[0]} content={activeRoute.content} />;
      activeCategory = activeRoute.category;
  } else {
      activeCategory = activeRoute.category;
      activeSeoContent = SEO_DATA[activeCategory];
      ContentToRender = (
        <>
            <CategoryPage key={activeRoute.path} config={activeRoute} />
            {activeSeoContent && (
                  <article className="w-full border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-6 py-24">
                      
                      {/* Header & Intro */}
                      <div className="text-center max-w-3xl mx-auto mb-20">
                           <div className="inline-block h-1 w-16 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full mb-6"></div>
                           <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                            {activeSeoContent.heading}
                           </h2>
                           <div className="text-lg text-slate-400 leading-relaxed">
                              {activeSeoContent.intro}
                           </div>
                      </div>

                      {/* Section 1: Why Use (Grid) */}
                      <div className="mb-24">
                          <h3 className="text-2xl font-bold text-white mb-10 text-center">{activeSeoContent.whyUse.title}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {activeSeoContent.whyUse.items.map((item, idx) => (
                                  <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
                                      <div className="text-4xl mb-6 bg-slate-900/50 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                                          {item.icon}
                                      </div>
                                      <h4 className="text-xl font-bold text-pink-200 mb-3">{item.title}</h4>
                                      <div className="text-slate-400 leading-relaxed text-sm">{item.desc}</div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Section 2: How To (Steps) */}
                      <div className="mb-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
                          <h3 className="text-2xl font-bold text-white mb-10 relative z-10">{activeSeoContent.howTo.title}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                              {activeSeoContent.howTo.steps.map((step, idx) => (
                                  <div key={idx} className="relative">
                                      <div className="text-5xl font-black text-white/5 absolute -top-4 -left-2 z-0">0{idx + 1}</div>
                                      <div className="relative z-10 pt-4">
                                          <div className="h-1 w-8 bg-indigo-500 rounded-full mb-4"></div>
                                          <div className="text-slate-300 font-medium leading-relaxed">{step}</div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Section 3: FAQ */}
                      <div className="max-w-3xl mx-auto">
                          <h3 className="text-2xl font-bold text-white mb-8 text-center">Preguntas Frecuentes (FAQ)</h3>
                          <div className="space-y-4">
                              {activeSeoContent.faq.map((item, idx) => (
                                  <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                                      <h4 className="font-bold text-lg text-pink-200 mb-2 flex items-start gap-3">
                                          <span className="text-pink-500">Q.</span> {item.q}
                                      </h4>
                                      <div className="text-slate-400 pl-7 text-sm leading-relaxed">{item.a}</div>
                                  </div>
                              ))}
                          </div>
                      </div>

                    </div>
                  </article>
            )}
        </>
      );
  }

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200">
      <Navbar 
        currentCategory={activeCategory} 
        onNavigate={handleNavigate} 
      />
      
      <main className="flex-grow w-full relative z-10">
        {ContentToRender}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
