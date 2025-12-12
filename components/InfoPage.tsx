
import React from 'react';

interface InfoPageProps {
  title: string;
  content: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
  return (
    <div className="pt-32 pb-24 relative min-h-screen">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block h-1 w-20 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mb-6 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                {title}
            </h1>
        </div>

        {/* Content Container */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up ring-1 ring-white/5">
            {/* Using prose-invert for dark mode typography standard */}
            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6 prose-headings:text-white prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:marker:text-pink-500">
                {content}
            </div>
        </div>

      </div>
    </div>
  );
};

export default InfoPage;
