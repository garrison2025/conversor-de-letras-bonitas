
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

// SEO Content Data Interface
interface SeoContent {
    heading: string;
    intro: React.ReactNode;
    whyUse: {
        title: string;
        items: { icon: string; title: string; desc: React.ReactNode }[];
    };
    howTo: {
        title: string;
        steps: React.ReactNode[];
    };
    faq: { q: string; a: React.ReactNode }[];
}

// SEO Content Data Structure
const seoData: Record<FontCategory, SeoContent> = {
    [FontCategory.ALL]: {
        heading: "Conversor de Letras Bonitas: Fuentes y Tipografías Online",
        intro: (
            <>
                Bienvenido al <strong>conversor de letras bonitas</strong> más avanzado de la web. Si buscas personalizar tus textos, este <strong>conversor de letras bonitas</strong> es la herramienta definitiva para transformar frases aburridas en tipografías estéticas y originales. 
                Ideal para biografías de Instagram, estados de WhatsApp y <a href="#/letras-facebook" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">publicaciones de Facebook</a>. 
                Con nuestro <strong>conversor de letras bonitas</strong>, podrás generar cientos de estilos Unicode, desde <a href="#/letras-cursivas" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">letras cursivas</a> hasta símbolos únicos, todo en cuestión de segundos.
            </>
        ),
        whyUse: {
            title: "¿Por qué usar nuestro Conversor de Letras Bonitas?",
            items: [
                {
                    icon: "🚀",
                    title: "Destaca con el Conversor de Letras Bonitas",
                    desc: "Las publicaciones que utilizan un conversor de letras bonitas para estilizar sus textos logran retener la atención del usuario un 80% más que las fuentes estándar."
                },
                {
                    icon: "📱",
                    title: "Compatibilidad Universal",
                    desc: "A diferencia de las fuentes instalables, nuestro conversor de letras bonitas genera símbolos Unicode. Esto garantiza que tus textos se vean bien en Instagram, TikTok, Twitter y WhatsApp."
                },
                {
                    icon: "🎨",
                    title: "Creatividad sin Límites",
                    desc: "El conversor de letras bonitas es tu aliado para crear una marca personal única. Diseña nicks, bios y mensajes que reflejen tu estilo utilizando nuestra herramienta gratuita."
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras Bonitas",
            steps: [
                "Escribe tu frase o nombre en la barra principal del conversor de letras bonitas.",
                <>Explora los múltiples estilos que el <strong>conversor de letras bonitas</strong> genera automáticamente para ti.</>,
                "Selecciona el estilo que más te guste y haz clic para copiarlo desde el conversor de letras bonitas.",
                "Pega tu texto personalizado en tus redes sociales favoritas y disfruta de tus nuevas letras bonitas."
            ]
        },
        faq: [
            { q: "¿Qué es un conversor de letras bonitas?", a: "Un conversor de letras bonitas es una herramienta digital que transforma texto normal en caracteres Unicode estilizados, permitiendo usar 'fuentes' diferentes en plataformas que normalmente no lo permiten." },
            { q: "¿Sirve el conversor de letras bonitas para Instagram?", a: "Sí, es su uso más popular. Nuestro conversor de letras bonitas está optimizado para biografías (bios), comentarios y descripciones de fotos en Instagram." },
            { q: "¿Es gratis este conversor de letras bonitas?", a: "Totalmente. Nuestro conversor de letras bonitas es gratuito, ilimitado y no requiere registro ni descargas." }
        ]
    },
    [FontCategory.CURSIVE]: {
        heading: "Conversor de Letras Cursivas Online",
        intro: (
            <>
                Este <strong>conversor de letras cursivas</strong> transforma instantáneamente tu texto digital en elegante caligrafía script y manuscrita. 
                Si buscas personalizar tu perfil, nuestro <strong>conversor de letras cursivas</strong> es la herramienta preferida para crear invitaciones digitales, nombres de usuario estéticos y mensajes románticos. 
                Ofrecemos desde estilos 'Bold Script' hasta trazos finos, todo generado por este potente <strong>conversor de letras cursivas</strong> gratuito. Combínalo con <a href="#/letras-amino" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">decoraciones Amino</a> para un efecto único.
            </>
        ),
        whyUse: {
            title: "¿Por qué usar este Conversor de Letras Cursivas?",
            items: [
                {
                    icon: "✍️",
                    title: "Elegancia y Sofisticación",
                    desc: "Al utilizar un conversor de letras cursivas, tu texto transmite una cercanía y elegancia clásica que las fuentes de sistema estándar no pueden igualar."
                },
                {
                    icon: "💌",
                    title: "Ideal para Invitaciones",
                    desc: "Nuestro conversor de letras cursivas es perfecto para diseñar textos de bodas, cumpleaños o tarjetas virtuales aesthetic sin usar programas de diseño."
                },
                {
                    icon: "✨",
                    title: "Estilo Aesthetic",
                    desc: "El conversor de letras cursivas es el pilar del estilo 'Soft Aesthetic'. Transforma cualquier frase simple en una cita inspiradora visualmente agradable."
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras Cursivas",
            steps: [
                "Ingresa tu frase o nombre en el cuadro de texto del conversor de letras cursivas.",
                "Explora la lista y elige entre variantes como Cursiva Negrita (Bold), Manuscrita o con decoraciones.",
                "Haz clic en tu estilo favorito generado por el conversor de letras cursivas para copiarlo.",
                "Pega el resultado en tu biografía de Instagram, estado de WhatsApp o chat."
            ]
        },
        faq: [
            { q: "¿Qué es un conversor de letras cursivas Unicode?", a: "Es una herramienta que mapea letras normales a símbolos matemáticos alfanuméricos que imitan la escritura a mano, visibles en casi todos los dispositivos." },
            { q: "¿Es gratis este conversor de letras cursivas?", a: <>Sí, puedes usar nuestro <strong>conversor de letras cursivas</strong> de forma ilimitada y gratuita. También puedes visitar el <a href="#/letras-facebook" className="text-indigo-400 hover:text-indigo-300">conversor para Facebook</a> para más opciones.</> }
        ]
    },
    [FontCategory.TATTOO]: {
        heading: "Diseñador de Letras para Tatuajes Online",
        intro: (
            <>
                Utiliza nuestro <strong>conversor de letras para tatuajes</strong> como tu primer paso antes de marcar tu piel. 
                Experimenta con estilos icónicos como 'Old School', 'Chicano', 'Viking Runes' y 'Minimalist Typewriter'. 
                Antes de decidir tu diseño permanente, visualiza tu frase en <a href="#/letras-goticas" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">letras góticas</a> o romanas.
            </>
        ),
        whyUse: {
            title: "¿Por qué probar fuentes para tatuajes aquí?",
            items: [
                {
                    icon: "💉",
                    title: "Visualización Previa",
                    desc: "Evita arrepentimientos. Mira cómo lucirá exactamente esa fecha o nombre en diferentes estilos antes de ir al estudio."
                },
                {
                    icon: "🐉",
                    title: "Inspiración Ilimitada",
                    desc: "Desde runas nórdicas hasta códigos de barras cyberpunk. Encuentra estilos que quizás no sabías que existían."
                },
                {
                    icon: "💡",
                    title: "Referencia para el Artista",
                    desc: "Lleva el diseño generado a tu tatuador. Les ayuda a entender exactamente el grosor, espaciado y estilo que buscas."
                }
            ]
        },
        howTo: {
            title: "Cómo diseñar tu texto para tatuaje",
            steps: [
                "Escribe la fecha (números), nombre o frase significativa.",
                "Navega a la sección 'Tatuajes' para ver filtros específicos.",
                "Prueba variantes: Números Romanos para fechas, Gótica para espalda, Minimal para muñeca.",
                "Haz captura o copia el diseño para mostrárselo a tu tatuador."
            ]
        },
        faq: [
            { q: "¿Son precisas las Runas Vikingas?", a: "Usamos una transliteración estándar al alfabeto Futhark. Es ideal para fines estéticos y decorativos." },
            { q: "¿Qué estilo es mejor para nombres?", a: <>La <a href="#/letras-cursivas" className="text-indigo-400 hover:text-indigo-300">letra cursiva</a> o el estilo 'Chicano' suelen ser las favoritas para nombres de seres queridos por su fluidez.</> }
        ]
    },
    [FontCategory.GOTHIC]: {
        heading: "Conversor de Letras Góticas: Fuentes Dark y Medievales",
        intro: (
            <>
                Transforma tu identidad digital con el <strong>conversor de letras góticas</strong> más avanzado. 
                Si buscas estética medieval, vampírica o metal, nuestro <strong>conversor de letras góticas</strong> convierte texto normal en tipografía Fraktur y Old English auténtica. 
                A diferencia de otros generadores, este <strong>conversor de letras góticas</strong> está optimizado para tatuajes y redes sociales. También puedes explorar estilos urbanos en el <a href="#/letras-graffiti" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">conversor graffiti</a>.
            </>
        ),
        whyUse: {
            title: "¿Por qué elegir nuestro Conversor de Letras Góticas?",
            items: [
                {
                    icon: "🏰",
                    title: "Impacto Visual Único",
                    desc: "Al utilizar un conversor de letras góticas (Blackletter), tus textos adquieren una autoridad histórica y una estética oscura imposible de ignorar."
                },
                {
                    icon: "🎮",
                    title: "Nicks para Gamers",
                    desc: "Destaca en LoL o WoW. Un conversor de letras góticas es la herramienta secreta de los pro players para crear nicknames que imponen respeto."
                },
                {
                    icon: "🦇",
                    title: "Versatilidad Dark",
                    desc: "Este conversor de letras góticas es esencial para perfiles Emo, Góticos o Rock, permitiendo personalizar bios con simbología antigua."
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras Góticas",
            steps: [
                "Escribe tu texto en el panel principal del conversor de letras góticas.",
                "Selecciona estilos como 'Bold Fraktur' o 'Medieval' generados por el conversor de letras góticas.",
                "Copia el resultado con un clic y pégalo donde quieras.",
                "Usa el conversor de letras góticas para diseñar tatuajes o posts virales."
            ]
        },
        faq: [
            { q: "¿Es gratis este conversor de letras góticas?", a: "Sí, nuestro conversor de letras góticas es totalmente gratuito e ilimitado para cualquier uso personal o comercial." },
            { q: "¿El conversor de letras góticas funciona en Instagram?", a: "Absolutamente. Los caracteres Unicode generados por el conversor de letras góticas son compatibles con biografías, captions y comentarios de Instagram." }
        ]
    },
    [FontCategory.GRAFFITI]: {
        heading: "Conversor de Letras Graffiti: Fuentes de Arte Urbano",
        intro: (
            <>
                Lleva la calle a la pantalla con el <strong>conversor de letras graffiti</strong> definitivo. Ideal para diseños digitales rebeldes, modernos y urbanos. 
                Este <strong>conversor de letras graffiti</strong> transforma texto plano en estilos icónicos como 'Spray Paint', 'Wildstyle', 'Blocks' y 'Bubble Letters'. 
                Estos diseños funcionan increíblemente bien para captar la atención en <a href="#/letras-facebook" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">Facebook</a>, Instagram y Twitter.
            </>
        ),
        whyUse: {
            title: "¿Por qué usar el Conversor de Letras Graffiti?",
            items: [
                {
                    icon: "🎨",
                    title: "Estilo Urbano Auténtico",
                    desc: "Aporta una vibra de hip-hop, skate y cultura callejera a tus textos digitales utilizando un conversor de letras graffiti especializado."
                },
                {
                    icon: "💥",
                    title: "Impacto Visual",
                    desc: "Los estilos generados por el conversor de letras graffiti, como las 'letras burbuja', ocupan más espacio visual y son imposibles de ignorar."
                },
                {
                    icon: "🧢",
                    title: "Originalidad Extrema",
                    desc: "Aléjate de lo convencional. Usa el conversor de letras graffiti para demostrar creatividad y actitud rebelde en tu perfil."
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras Graffiti",
            steps: [
                "Escribe tu texto corto (mejor 1-3 palabras) en el cuadro de texto.",
                "Selecciona la categoría 'Graffiti' para ver los resultados del conversor de letras graffiti.",
                "Elige entre 'Burbujas' (rellenas o contorno), 'Bloques' o estilos con flechas.",
                "Haz clic para copiar el diseño del conversor de letras graffiti y pégalo donde quieras."
            ]
        },
        faq: [
            { q: "¿Qué estilos incluye el conversor de letras graffiti?", a: "Incluye variantes Unicode que imitan el arte callejero, como Bubble (burbujas), Square (bloques), y caracteres tipo Tag." },
            { q: "¿Sirve este conversor de letras graffiti para logos?", a: "Sí, es una herramienta excelente para bocetar ideas rápidas de logotipos tipográficos o marcas personales con estilo urbano." }
        ]
    },
    [FontCategory.FACEBOOK]: {
        heading: "Conversor de Letras para Facebook (Negritas y Fuentes)",
        intro: (
            <>
                Destaca en el feed con el <strong>conversor de letras para Facebook</strong> más versátil. Aunque Facebook no permite cambiar fuentes nativamente, nuestro <strong>conversor de letras para Facebook</strong> habilita el uso de Negritas, Cursivas, Tachado y Monoroespacio en tus posts.
                Es la herramienta definitiva para quienes buscan un <strong>conversor de letras para Facebook</strong> que también ofrezca símbolos virales, texto invisible y estilos tipo <a href="#/letras-amino" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">Amino</a>.
            </>
        ),
        whyUse: {
            title: "¿Por qué usar un Conversor de Letras para Facebook?",
            items: [
                {
                    icon: "📢",
                    title: "Romper el Patrón Visual",
                    desc: "El feed es monótono. Un buen conversor de letras para Facebook te permite usar 'Negrita' o 'Gótica' para detener el scroll del usuario."
                },
                {
                    icon: "🔦",
                    title: "Enfatizar Ideas Clave",
                    desc: "Con el conversor de letras para Facebook, usa negritas para títulos importantes, cursivas para citas y tachado para humor."
                },
                {
                    icon: "💬",
                    title: "Comentarios Virales",
                    desc: "Tus comentarios no se perderán. Al usar este conversor de letras para Facebook, tu respuesta resalta visualmente sobre las demás."
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras para Facebook",
            steps: [
                "Escribe tu estado o comentario en nuestro conversor de letras para Facebook.",
                "Navega a la categoría 'Facebook' para ver los estilos optimizados.",
                "Elige estilos populares del conversor de letras para Facebook como 'Bold Sans' o 'Italic'.",
                "Copia el resultado del conversor de letras para Facebook y pégalo en tu muro."
            ]
        },
        faq: [
            { q: "¿Es seguro usar este conversor de letras para Facebook?", a: "Sí, el conversor de letras para Facebook genera texto Unicode estándar que no viola las normas comunitarias, siempre que el contenido sea apropiado." },
            { q: "¿Funciona el conversor de letras para Facebook en móviles?", a: "Absolutamente. Nuestro conversor de letras para Facebook está optimizado para que los estilos se vean bien en Android, iOS y Desktop." }
        ]
    },
    [FontCategory.AMINO]: {
        heading: "Conversor de Letras Amino: Decoración Aesthetic y Símbolos",
        intro: (
            <>
                Bienvenido al <strong>conversor de letras Amino</strong> más completo de la web. La comunidad Amino se basa en la creatividad visual, y nuestro <strong>conversor de letras Amino</strong> es la herramienta esencial para destacar.
                Diseñado específicamente para esta app, este <strong>conversor de letras Amino</strong> te permite generar marcos, bordes, separadores y estilos 'soft' (kawaii) al instante.
                Combina estos estilos generados por el <strong>conversor de letras Amino</strong> con <a href="#/letras-cursivas" className="text-pink-400 hover:text-pink-300 underline decoration-pink-500/30 hover:decoration-pink-500">letras cursivas</a> para crear blogs, wikis y perfiles verdaderamente únicos y profesionales.
            </>
        ),
        whyUse: {
            title: "¿Por qué usar nuestro Conversor de Letras Amino?",
            items: [
                {
                    icon: "💎",
                    title: "Estética Profesional con el Conversor de Letras Amino",
                    desc: (
                        <>
                            Los blogs bien estructurados tienen más chances de ser destacados. Utilizando nuestro <strong>conversor de letras Amino</strong>, tus publicaciones tendrán los marcos y separadores necesarios para impresionar a líderes y curadores.
                        </>
                    )
                },
                {
                    icon: "🌸",
                    title: "Estilo Kawaii y Soft",
                    desc: (
                        <>
                            El <strong>conversor de letras Amino</strong> te da acceso directo a símbolos raros, kaomojis y decoraciones aesthetic que definen la cultura de la plataforma y no encontrarás en teclados normales.
                        </>
                    )
                },
                {
                    icon: "✨",
                    title: "Lectura Agradable",
                    desc: (
                        <>
                            Gracias al <strong>conversor de letras Amino</strong>, puedes espaciar y decorar textos largos, haciendo que tus wikis y roleplays sean mucho más ligeros y bonitos de leer para tus seguidores.
                        </>
                    )
                }
            ]
        },
        howTo: {
            title: "Cómo usar el Conversor de Letras Amino paso a paso",
            steps: [
                <>Escribe tu título, nickname o frase en el panel principal del <strong>conversor de letras Amino</strong>.</>,
                "Navega a la categoría 'Amino' para filtrar los resultados específicos.",
                <>Prueba los estilos exclusivos del <strong>conversor de letras Amino</strong> como bordes '【 Box 】', estrellas y decoraciones aesthetic.</>,
                <>Haz clic para copiar el resultado del <strong>conversor de letras Amino</strong> y pégalo directamente en tu blog, chat o biografía de la app.</>
            ]
        },
        faq: [
            { q: "¿Es gratis el conversor de letras Amino?", a: <>Sí, nuestro <strong>conversor de letras Amino</strong> es una herramienta 100% gratuita y online. No necesitas descargar aplicaciones extra para obtener la mejor estética.</> },
            { q: "¿Funcionan los estilos del conversor de letras Amino en chats?", a: <>Absolutamente. Los símbolos generados por el <strong>conversor de letras Amino</strong> son compatibles con blogs, wikis, biografías y también en las burbujas de chat de Amino.</> }
        ]
    }
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash;
      if (!hash) hash = '#/';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
      
      // --- DYNAMIC SEO ENGINE ---
      const clean = hash.replace('#', '') || '/';

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
      
      const fullUrl = `https://letrasbonitas.pro${clean === '/' ? '' : '/#' + clean}`;
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

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
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

  const cleanPath = currentPath.replace('#', '') || '/';
  
  const handleNavigate = (pathOrCat: string | FontCategory) => {
      // Determine if it's a category or a full path
      if (typeof pathOrCat === 'string' && (pathOrCat.startsWith('#') || pathOrCat.startsWith('/'))) {
          window.location.hash = pathOrCat;
      } else {
          const entry = Object.values(routes).find(r => r.category === pathOrCat && !r.isStatic);
          if (entry) {
            window.location.hash = entry.path;
          } else if (pathOrCat === 'blog') {
             window.location.hash = '/blog';
          }
      }
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
      activeSeoContent = seoData[activeCategory];
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
