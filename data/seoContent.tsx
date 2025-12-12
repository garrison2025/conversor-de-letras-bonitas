
import React from 'react';
import { FontCategory } from '../types';

export interface SeoContent {
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

export const SEO_DATA: Record<FontCategory, SeoContent> = {
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
