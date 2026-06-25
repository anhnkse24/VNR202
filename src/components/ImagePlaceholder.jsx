import React, { useState } from 'react';
import { Image, FolderPlus, Info } from 'lucide-react';

export default function ImagePlaceholder({ src, alt, tip, aspectRatio = "aspect-[16/10]", className = "" }) {
  const [hasError, setHasError] = useState(false);

  // Extract the filename from the source path for easy copy-pasting guidance
  const fileName = src.split('/').pop();

  return (
    <div className={`relative overflow-hidden rounded-xl border border-museum-red/10 bg-museum-creamDark/30 shadow-sm ${aspectRatio} ${className}`}>
      {!hasError ? (
        <img 
          src={src} 
          alt={alt} 
          onError={() => setHasError(true)} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        /* Styled Academic Placeholder Frame */
        <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-museum-cream to-museum-creamDark border-2 border-dashed border-museum-gold/30 text-museum-charcoal relative">
          
          {/* Top Info Badge */}
          <div className="flex justify-between items-start gap-2">
            <span className="text-[10px] font-bold text-museum-gold bg-museum-gold/10 px-2 py-0.5 rounded border border-museum-gold/20 flex items-center gap-1">
              <FolderPlus size={10} />
              assets/{fileName}
            </span>
            <span className="text-[9px] text-museum-charcoal/50 uppercase font-semibold">Khung ảnh chờ dán</span>
          </div>

          {/* Center Graphic */}
          <div className="flex flex-col items-center justify-center flex-grow py-3">
            <div className="bg-museum-gold/10 p-3 rounded-full text-museum-gold mb-2 border border-museum-gold/20">
              <Image size={24} />
            </div>
            <p className="font-serif text-sm font-bold text-museum-charcoal text-center line-clamp-1 px-2">
              {alt}
            </p>
          </div>

          {/* Bottom Tip Guidance */}
          {tip && (
            <div className="bg-white/80 p-2.5 rounded-lg border border-museum-gold/10 flex gap-2 items-start text-[11px] leading-relaxed text-museum-charcoal/80">
              <Info size={14} className="text-museum-gold shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
