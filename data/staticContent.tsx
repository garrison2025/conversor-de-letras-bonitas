
import React from 'react';

export const ABOUT_CONTENT = (
    <>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-6">Nuestra Historia y Misión</h2>
        <p className="lead text-xl text-slate-300 mb-8">
            Bienvenido a <strong>ConversorDeLetrasBonitas.org</strong>, la plataforma líder en transformación tipográfica digital diseñada para creadores de contenido, influencers y usuarios que buscan destacar.
        </p>
        
        <h3 className="text-2xl font-bold text-white mt-12 mb-4">¿Quiénes Somos?</h3>
        <p>
            Nacimos en 2024 con una misión clara: democratizar el diseño digital. Creemos que la identidad online no debe estar limitada por las fuentes predeterminadas aburridas de las redes sociales. Somos un equipo apasionado de desarrolladores y diseñadores gráficos dedicados a expandir las posibilidades creativas del estándar Unicode.
        </p>
        <p>
            Hoy en día, millones de usuarios utilizan nuestras herramientas para personalizar sus biografías de <strong>Instagram</strong>, estados de <strong>WhatsApp</strong>, tweets y nicks de videojuegos como Free Fire y PUBG.
        </p>

        <h3 className="text-2xl font-bold text-white mt-12 mb-4">Nuestros Valores</h3>
        <ul className="grid gap-4 mt-6">
            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                <strong className="text-pink-400 block mb-1">Innovación Constante</strong>
                Agregamos continuamente nuevos alfabetos y estilos basados en las tendencias virales (Coquette, Aesthetic, Cyberpunk).
            </li>
            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                <strong className="text-indigo-400 block mb-1">Privacidad Total</strong>
                Todo el procesamiento se realiza en tu dispositivo. No guardamos lo que escribes.
            </li>
            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                <strong className="text-emerald-400 block mb-1">Acceso Gratuito</strong>
                Creemos que la creatividad debe ser libre. Nuestra herramienta es y será siempre 100% gratuita.
            </li>
        </ul>
    </>
);

export const CONTACT_CONTENT = (
    <>
        <h2 className="text-3xl font-bold text-white mb-6">Estamos aquí para escucharte</h2>
        <p className="text-lg text-slate-300 mb-8">
            Tu opinión es el motor de nuestras actualizaciones. Ya sea que hayas encontrado un error, tengas una sugerencia de fuente o quieras colaborar, nuestro equipo de soporte está listo.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-12">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-2xl border border-indigo-500/30 shadow-lg">
                <span className="text-3xl mb-4 block">📩</span>
                <h3 className="text-xl font-bold text-white mb-2">Atención al Usuario</h3>
                <p className="text-slate-400 text-sm mb-6">Para dudas sobre el funcionamiento, reportes de bugs o sugerencias de nuevos estilos.</p>
                <div className="font-mono text-indigo-300 bg-black/30 p-3 rounded text-center select-all">
                    info@conversordeletrasbonitas.org
                </div>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-slate-900 p-8 rounded-2xl border border-pink-500/30 shadow-lg">
                <span className="text-3xl mb-4 block">🤝</span>
                <h3 className="text-xl font-bold text-white mb-2">Colaboraciones</h3>
                <p className="text-slate-400 text-sm mb-6">Para propuestas comerciales, publicidad y alianzas estratégicas.</p>
                <div className="font-mono text-pink-300 bg-black/30 p-3 rounded text-center select-all">
                    info@conversordeletrasbonitas.org
                </div>
            </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-amber-500">
            <h4 className="font-bold text-amber-400 mb-2">Tiempo de Respuesta</h4>
            <p className="text-sm text-slate-300">
                Nuestro equipo humano revisa cada mensaje. Intentamos responder en un plazo máximo de <strong>24 a 48 horas hábiles</strong>.
            </p>
        </div>
    </>
);

export const PRIVACY_CONTENT = (
    <>
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg mb-8">
            <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Última actualización</span>
            <span className="text-white font-mono">12 de Diciembre de 2025</span>
        </div>

        <p>
            En <strong>conversordeletrasbonitas.org</strong>, accesible desde https://conversordeletrasbonitas.org, una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene tipos de información que se recopila y registra y cómo la utilizamos.
        </p>

        <h3 className="text-xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">1. Archivos de Registro (Log Files)</h3>
        <p>
            Seguimos un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan sitios web. La información recopilada incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos no están vinculados a ninguna información que sea personalmente identificable.
        </p>

        <h3 className="text-xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">2. Cookies y Web Beacons</h3>
        <p>
            Utilizamos "cookies" para almacenar información, incluidas las preferencias de los visitantes y las páginas del sitio web que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador de los visitantes.
        </p>
        
        <h3 className="text-xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">3. Cookies de Google DoubleClick DART</h3>
        <p>
            Google es uno de los proveedores externos en nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio en función de su visita a conversordeletrasbonitas.org y otros sitios en Internet.
        </p>

        <h3 className="text-xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">4. Privacidad de los Niños</h3>
        <p>
            Otra parte de nuestra prioridad es agregar protección para los niños mientras usan Internet. Alentamos a los padres y tutores a observar, participar y/o monitorear y guiar su actividad en línea. conversordeletrasbonitas.org no recopila a sabiendas ninguna Información de Identificación Personal de niños menores de 13 años.
        </p>
    </>
);

export const TERMS_CONTENT = (
    <>
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg mb-8">
            <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">Vigencia</span>
            <span className="text-white font-mono">12 de Diciembre de 2025</span>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Términos</h3>
        <p>
            Al acceder al sitio web en <strong>https://conversordeletrasbonitas.org</strong>, usted acepta estar sujeto a estos términos de servicio, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Licencia de Uso</h3>
        <p>
            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de conversordeletrasbonitas.org solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-300">
            <li>Modificar o copiar los materiales;</li>
            <li>Usar los materiales para cualquier propósito comercial o para cualquier exhibición pública (comercial o no comercial);</li>
            <li>Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de conversordeletrasbonitas.org;</li>
            <li>Eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales; o</li>
            <li>Transferir los materiales a otra persona o "espejar" los materiales en cualquier otro servidor.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Descargo de Responsabilidad</h3>
        <p>
            Los materiales en el sitio web de conversordeletrasbonitas.org se proporcionan "tal cual". conversordeletrasbonitas.org no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o las condiciones de comerciabilidad.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Limitaciones</h3>
        <p>
            En ningún caso conversordeletrasbonitas.org o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surjan del uso o la incapacidad de usar los materiales en el sitio web de conversordeletrasbonitas.org.
        </p>
    </>
);
