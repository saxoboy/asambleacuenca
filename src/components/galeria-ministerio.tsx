"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GaleriaMinisterioProps {
  fotos: { url: string; alt: string }[];
}

export default function GaleriaMinisterio({ fotos }: GaleriaMinisterioProps) {
  const [indice, setIndice] = useState<number | null>(null);

  const abrir = (i: number) => setIndice(i);
  const cerrar = () => setIndice(null);
  const anterior = () => setIndice((i) => (i !== null ? (i - 1 + fotos.length) % fotos.length : 0));
  const siguiente = () => setIndice((i) => (i !== null ? (i + 1) % fotos.length : 0));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") anterior();
    if (e.key === "ArrowRight") siguiente();
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fotos.map((foto, i) => (
          <button
            key={i}
            onClick={() => abrir(i)}
            className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-zoom-in"
            aria-label={`Ver foto ${i + 1}`}
          >
            <Image
              src={foto.url}
              alt={foto.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={indice !== null} onOpenChange={(open) => !open && cerrar()}>
        <DialogContent
          className="max-w-4xl w-full p-0 bg-black/95 border-0 outline-none"
          onKeyDown={handleKeyDown}
        >
          {/* Cerrar */}
          <button
            onClick={cerrar}
            className="absolute top-3 right-3 z-50 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/80 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Contador */}
          {fotos.length > 1 && indice !== null && (
            <span className="absolute top-3 left-3 z-50 text-xs text-white/70 bg-black/50 px-2 py-1 rounded-full">
              {indice + 1} / {fotos.length}
            </span>
          )}

          {/* Imagen */}
          {indice !== null && (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src={fotos[indice].url}
                alt={fotos[indice].alt}
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* Navegación */}
          {fotos.length > 1 && (
            <>
              <button
                onClick={anterior}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={siguiente}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
