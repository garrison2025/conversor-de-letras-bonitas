
import React, { useState, useEffect } from 'react';

// Declare confetti global
declare global {
  interface Window {
    confetti: any;
  }
}

interface FontCardProps {
  id: string;
  name: string;
  result: string;
  originalText?: string; // For A11y
  isPinned: boolean;
  onTogglePin: () => void;
  isListView?: boolean;
  onCopy?: (text: string) => void;
}

interface ImageConfig {
    bgType: 'solid' | 'gradient' | 'texture' | 'transparent';
    bgValue: string; // Hex, Gradient string, or texture name
    textColor: string;
    fontSize: number;
    padding: number;
    aspectRatio: 'square' | 'portrait' | 'landscape';
    fontFamily: string;
}

// Category 2: Web Fonts List (Extended with new requests)
const WEB_FONTS = [
    { name: 'Original', family: 'Outfit, sans-serif' },
    
    // --- 1. Elegant & Romantic ---
    { name: 'Great Vibes', family: '"Great Vibes", cursive' },
    { name: 'Pinyon Script (Aristocratic)', family: '"Pinyon Script", cursive' }, 
    { name: 'Allura', family: '"Allura", cursive' },
    { name: 'Parisienne', family: '"Parisienne", cursive' },
    
    // --- 2. Modern & Brush ---
    { name: 'Pacifico', family: '"Pacifico", cursive' },
    { name: 'Dancing Script', family: '"Dancing Script", cursive' },
    { name: 'Cookie', family: '"Cookie", cursive' },
    
    // --- 3. Casual & Handwriting (Education/Notes) ---
    { name: 'Caveat (Handwritten)', family: '"Caveat", cursive' }, 
    { name: 'Amatic SC (Hand-poked)', family: '"Amatic SC", cursive' },
    { name: 'Reenie Beanie (Grunge)', family: '"Reenie Beanie", cursive' }, 
    { name: 'Shadows Into Light', family: '"Shadows Into Light", cursive' },
    { name: 'Indie Flower', family: '"Indie Flower", cursive' },
    { name: 'Sacramento', family: '"Sacramento", cursive' },
    { name: 'Zeyada (Signature/Messy)', family: '"Zeyada", cursive' },
    
    // --- 4. Aesthetic / Minimalist ---
    { name: 'Courier Prime (Typewriter)', family: '"Courier Prime", monospace' }, 
    { name: 'Special Elite (Vintage Typewriter)', family: '"Special Elite", monospace' },
    { name: 'Cutive Mono (Retro)', family: '"Cutive Mono", monospace' }, 
    
    // --- 5. Retro & Bold ---
    { name: 'Lobster (Retro Bold)', family: '"Lobster", display' }, 
    { name: 'Shrikhand (70s Bold)', family: '"Shrikhand", serif' }, 
    { name: 'Bungee Shade (Retro/3D)', family: '"Bungee Shade", display' },

    // --- 6. Graffiti & Urban ---
    { name: 'Permanent Marker (Marker)', family: '"Permanent Marker", cursive' },
    { name: 'Sedgwick Ave (Graffiti)', family: '"Sedgwick Ave", cursive' },
    { name: 'Rock Salt (Street)', family: '"Rock Salt", cursive' },
    { name: 'Rubik Wet Paint (Drip)', family: '"Rubik Wet Paint", display' },
    { name: 'Creepster (Horror/Melt)', family: '"Creepster", display' },
    { name: 'Nosifer (Dripping Blood)', family: '"Nosifer", display' },

    // --- 7. Serif Display ---
    { name: 'Playfair Display (Vogue)', family: '"Playfair Display", serif' },
    { name: 'Cinzel (Roman/Viking)', family: '"Cinzel", serif' },

    // --- 8. Tattoo / Gothic / Cholo ---
    { name: 'Pirata One (Tattoo)', family: '"Pirata One", system-ui' },
    { name: 'UnifrakturMaguntia (Old English)', family: '"UnifrakturMaguntia", serif' },
    { name: 'Rye (Old School / Western)', family: '"Rye", serif' },
    { name: 'Montserrat (Minimalist)', family: '"Montserrat", sans-serif' },
    { name: 'Send Flowers (Floral)', family: '"Send Flowers", cursive' },
    { name: 'MedievalSharp (Fantasy/Elven)', family: '"MedievalSharp", cursive' },
    { name: 'Finger Paint (Childish/Crayon)', family: '"Finger Paint", cursive' },
    { name: 'Black Ops One (Stencil)', family: '"Black Ops One", system-ui' },
    { name: 'Codystar (Dotwork)', family: '"Codystar", display' },
    { name: 'Uncial Antiqua (Celtic)', family: '"Uncial Antiqua", system-ui' },

    // --- 9. Cyberpunk / Sci-Fi / Digital ---
    { name: 'Orbitron (Futuristic)', family: '"Orbitron", sans-serif' },
    { name: 'Wallpoet (Cyberpunk)', family: '"Wallpoet", display' },
    { name: 'Press Start 2P (Arcade)', family: '"Press Start 2P", display' },
    { name: 'VT323 (Terminal)', family: '"VT323", monospace' },
    { name: 'Share Tech Mono (Digital/Barcode)', family: '"Share Tech Mono", monospace' },

    { name: 'Mr Dafoe', family: '"Mr Dafoe", cursive' },
    { name: 'Mrs Saint Delafield', family: '"Mrs Saint Delafield", cursive' },
];

const FontCard: React.FC<FontCardProps> = ({ id, name, result, originalText = "Texto", isPinned, onTogglePin, isListView = false, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  // Image Editor State
  const [imgConfig, setImgConfig] = useState<ImageConfig>({
      bgType: 'gradient',
      bgValue: 'linear-gradient(135deg, #4F46E5, #EC4899)',
      textColor: '#FFFFFF',
      fontSize: 60,
      padding: 80,
      aspectRatio: 'square',
      fontFamily: 'Outfit, sans-serif'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      
      // Confetti Explosion
      if (window.confetti) {
          window.confetti({
              particleCount: 60,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#F43F5E', '#8B5CF6', '#EC4899']
          });
      }

      if (onCopy) onCopy(result);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
        navigator.share({
            title: 'LetrasBonitas Pro',
            text: result,
        }).catch(console.error);
    } else {
        handleCopy();
    }
  };

  const openEditor = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowEditor(true);
  };

  const generateAndDownloadImage = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate Dimensions based on Aspect Ratio
      let width = 1080;
      let height = 1080;
      if (imgConfig.aspectRatio === 'landscape') height = 600;
      if (imgConfig.aspectRatio === 'portrait') width = 800;

      // Use the original text if a web font is selected, otherwise use the unicode result
      // This is crucial: Web fonts need normal characters to render properly.
      const textToRender = (imgConfig.fontFamily.includes('Outfit') && !imgConfig.fontFamily.includes('cursive')) 
          ? result 
          : originalText;

      // Dynamic sizing based on text length to prevent clipping in simple mode
      ctx.font = `${imgConfig.fontSize}px ${imgConfig.fontFamily}`;
      const textMetrics = ctx.measureText(textToRender);
      const minWidth = textMetrics.width + (imgConfig.padding * 2);
      if (minWidth > width) width = minWidth;

      canvas.width = width;
      canvas.height = height;

      // Background
      if (imgConfig.bgType === 'transparent') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
          if (imgConfig.bgType === 'gradient') {
              // Parse simple gradient string for canvas or just fill rect if using presets
              // Simplified for reliability: Create a generic vibrant gradient if preset detected
              const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
              if (imgConfig.bgValue.includes('4F46E5')) { // Sunset
                  grd.addColorStop(0, "#4F46E5"); grd.addColorStop(1, "#EC4899");
              } else if (imgConfig.bgValue.includes('10B981')) { // Ocean
                  grd.addColorStop(0, "#0EA5E9"); grd.addColorStop(1, "#10B981");
              } else if (imgConfig.bgValue.includes('1E293B')) { // Midnight
                  grd.addColorStop(0, "#0F172A"); grd.addColorStop(1, "#1E293B");
              } else {
                   grd.addColorStop(0, "#4F46E5"); grd.addColorStop(1, "#EC4899");
              }
              ctx.fillStyle = grd;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else if (imgConfig.bgType === 'texture') {
              ctx.fillStyle = '#111';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              // Simple noise simulation
              for (let i = 0; i < 50000; i++) {
                 ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
                 ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
              }
          } else {
              ctx.fillStyle = imgConfig.bgValue;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
      }

      // Text
      ctx.fillStyle = imgConfig.textColor;
      // Ensure we use the selected web font
      ctx.font = `400 ${imgConfig.fontSize}px ${imgConfig.fontFamily}`; 
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      const x = canvas.width / 2;
      let y = canvas.height / 2;
      
      ctx.fillText(textToRender, x, y);

      // Watermark
      ctx.fillStyle = (imgConfig.bgType === 'solid' && imgConfig.bgValue === '#FFFFFF') ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)';
      ctx.font = '24px "DM Sans", sans-serif';
      // Updated watermark to match the actual domain
      ctx.fillText('conversordeletrasbonitas.org', x, canvas.height - 40);

      try {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `letras-bonitas-${id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setShowEditor(false); 
      } catch (err) {
          console.error("Download failed", err);
      }
  };

  const handlePinClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onTogglePin();
  };

  return (
    <>
        {/* Main Card Render */}
        {isListView ? (
             <li 
                onClick={handleCopy}
                className={`
                    group relative bg-slate-800/40 backdrop-blur-md transition-all duration-200 cursor-pointer
                    rounded-xl overflow-hidden border border-white/5 hover:border-white/20
                    flex items-center justify-between p-4
                    ${copied ? 'bg-emerald-900/20 border-emerald-500/30' : 'hover:bg-slate-800/60'}
                `}
                role="button"
                aria-label={`Copiar estilo ${name}: ${originalText}`}
            >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button 
                        onClick={handlePinClick}
                        aria-label={isPinned ? `Quitar ${name} de favoritos` : `Añadir ${name} a favoritos`}
                        className={`p-2 rounded-full transition-colors ${isPinned ? 'text-pink-500' : 'text-slate-600 hover:text-white'}`}
                    >
                        <svg className="w-5 h-5" fill={isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <div className="flex flex-col min-w-0">
                        <span className="sr-only">Texto transformado:</span>
                        <h3 className="text-xl md:text-2xl text-white truncate font-medium" aria-hidden="true">{result}</h3>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{name}</span>
                    </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                    <button
                        onClick={openEditor}
                        aria-label={`Crear imagen con estilo ${name}`}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>

                    <div className={`
                        text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg
                        ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}
                    `}>
                        {copied ? 'Copiado' : 'Copiar'}
                    </div>
                </div>
            </li>
        ) : (
            <li 
                onClick={handleCopy}
                className={`
                    group relative bg-slate-800/40 backdrop-blur-md transition-all duration-300 cursor-pointer
                    rounded-2xl overflow-hidden
                    ${copied 
                        ? 'ring-2 ring-emerald-500 bg-slate-800/80' 
                        : isPinned
                            ? 'ring-1 ring-pink-500/50 shadow-lg shadow-pink-500/10'
                            : 'hover:-translate-y-2 hover:bg-slate-800/60 ring-1 ring-white/5 hover:ring-white/20 hover:shadow-2xl hover:shadow-pink-500/10'}
                `}
                role="button"
                aria-label={`Copiar estilo ${name}: ${originalText}`}
            >
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <button 
                    onClick={handlePinClick}
                    aria-label={isPinned ? `Quitar ${name} de favoritos` : `Añadir ${name} a favoritos`}
                    className={`absolute top-3 right-3 p-2 rounded-full z-20 transition-all duration-200 ${isPinned ? 'text-pink-500 bg-pink-500/10' : 'text-slate-600 hover:text-pink-400 hover:bg-white/5'}`}
                    title={isPinned ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    <svg className="w-5 h-5" fill={isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                <button
                    onClick={openEditor}
                    aria-label={`Crear imagen con estilo ${name}`}
                    className="absolute top-3 left-3 p-2 rounded-full z-20 transition-all duration-200 text-slate-600 hover:text-white hover:bg-white/5 opacity-0 group-hover:opacity-100"
                    title="Crear Imagen"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>

                <div className="p-8 flex items-center justify-center min-h-[160px] relative z-10">
                    <h3 className={`
                        text-3xl md:text-4xl text-center break-words w-full leading-normal transition-all duration-200 font-medium
                        ${copied ? 'text-emerald-400 scale-105' : 'text-white group-hover:text-white'}
                    `} aria-hidden="true">
                        {result || <span className="text-slate-600">Vista previa</span>}
                    </h3>
                </div>

                <div className="px-6 py-4 border-t border-white/5 flex justify-between items-center bg-slate-900/30">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors truncate max-w-[120px]">
                        {name}
                    </span>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            aria-label="Compartir"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </button>

                        <div className={`
                            flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 px-3 py-1.5 rounded-full
                            ${copied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'}
                        `}>
                            {copied ? (
                                <>
                                    <span>Copiado</span>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </>
                            ) : (
                                <span>Copiar</span>
                            )}
                        </div>
                    </div>
                </div>
            </li>
        )}

        {/* Improved Image Studio Modal */}
        {showEditor && (
            <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
                onClick={() => setShowEditor(false)}
            >
                <div 
                    className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                        <h3 className="text-white font-bold text-lg">Estudio de Imagen (Pro)</h3>
                        <button onClick={() => setShowEditor(false)} className="text-slate-400 hover:text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className={`
                        h-64 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-500
                        ${imgConfig.bgType === 'transparent' ? 'bg-[url("https://letrasbonitas.pro/checkered.png")] bg-repeat' : ''}
                    `}
                    style={{
                        background: imgConfig.bgType === 'solid' 
                            ? imgConfig.bgValue 
                            : imgConfig.bgType === 'gradient' ? imgConfig.bgValue : '#111'
                    }}
                    >
                        {imgConfig.bgType === 'texture' && (
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'}}></div>
                        )}
                        
                        <div className="relative z-10 text-center w-full px-4">
                            <span className="text-3xl break-words leading-tight" style={{ 
                                color: imgConfig.textColor, 
                                fontFamily: imgConfig.fontFamily 
                            }}>
                                {/* Logic: If it's the original outfit font, use the unicode result. If it's a web font, use the original text so it renders nicely */}
                                {(imgConfig.fontFamily.includes('Outfit') && !imgConfig.fontFamily.includes('cursive')) ? result : originalText}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="p-6 space-y-5">
                        {/* Font Selector (Category 2 Request) */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Fuente (Estilo Real)</label>
                            <select 
                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={imgConfig.fontFamily}
                                onChange={(e) => setImgConfig({...imgConfig, fontFamily: e.target.value})}
                            >
                                {WEB_FONTS.map((font) => (
                                    <option key={font.name} value={font.family}>{font.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Theme Select */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Temas</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'gradient', bgValue: 'linear-gradient(135deg, #4F46E5, #EC4899)'})} className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 border-2 border-transparent hover:border-white flex-shrink-0"></button>
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'gradient', bgValue: 'linear-gradient(135deg, #0EA5E9, #10B981)'})} className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 border-2 border-transparent hover:border-white flex-shrink-0"></button>
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'gradient', bgValue: 'linear-gradient(135deg, #F59E0B, #EF4444)'})} className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 border-2 border-transparent hover:border-white flex-shrink-0"></button>
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'texture', bgValue: '#111'})} className="w-12 h-12 rounded-xl bg-slate-800 border-2 border-transparent hover:border-white flex items-center justify-center text-xs text-white flex-shrink-0">Grain</button>
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'solid', bgValue: '#000'})} className="w-12 h-12 rounded-xl bg-black border-2 border-transparent hover:border-white flex-shrink-0"></button>
                                <button onClick={() => setImgConfig({...imgConfig, bgType: 'solid', bgValue: '#FFF', textColor: '#000'})} className="w-12 h-12 rounded-xl bg-white border-2 border-transparent hover:border-white flex-shrink-0"></button>
                            </div>
                        </div>

                        <button 
                            onClick={generateAndDownloadImage}
                            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Descargar PNG
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default FontCard;
