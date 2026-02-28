"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Foto {
  thumbUrl: string;
  fullUrl: string;
  alt: string;
}

export function GaleriaLightbox({ fotos }: { fotos: Foto[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + fotos.length) % fotos.length);
  const next = () => setIndex((i) => (i + 1) % fotos.length);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fotos.length]);

  return (
    <>
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-5">Galería de Fotos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src={foto.thumbUrl}
                alt={foto.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 pt-8 bg-black/90 border-0 [&>button]:text-white/80 [&>button]:hover:text-white [&>button]:hover:bg-white/10 [&>button]:z-20"
          style={{ width: "90vw", maxWidth: "1280px" }}
        >
          <VisuallyHidden>
            <DialogTitle>Foto {index + 1} de {fotos.length}</DialogTitle>
          </VisuallyHidden>

          {/* grid de 3 columnas: flecha | foto | flecha */}
          <div className="grid items-center gap-1 px-2 pb-3" style={{ gridTemplateColumns: "40px 1fr 40px" }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className={`text-white hover:bg-white/15 ${fotos.length <= 1 ? "invisible" : ""}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Imagen centrada */}
            <div className="flex justify-center relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotos[index].fullUrl}
                alt={fotos[index].alt}
                className="max-h-[75vh] max-w-full w-auto h-auto block rounded"
              />
              {fotos.length > 1 && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/70 text-xs tabular-nums bg-black/60 px-2.5 py-1 rounded-full">
                  {index + 1} / {fotos.length}
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className={`text-white hover:bg-white/15 ${fotos.length <= 1 ? "invisible" : ""}`}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
