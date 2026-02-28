// Re-renderizar cada 60 segundos para que el badge EN VIVO expire correctamente
export const revalidate = 60;

import { Suspense } from "react";
import HeroMain from "@/components/hero";
import Transmisiones from "@/components/transmisiones";
import Eventos from "@/components/eventos";
import Ministerios from "@/components/ministerios";
import HistoriaCTA from "@/components/historia-cta";
import Noticias from "@/components/noticias";
import Contactenos from "@/components/contactenos";

function SectionSkeleton({ className = "h-64" }: { className?: string }) {
  return <div className={`w-full animate-pulse bg-muted/20 ${className}`} />;
}

export default function PageWeb() {
  return (
    <>
      <HeroMain />
      <Suspense fallback={<SectionSkeleton className="h-48" />}>
        <Transmisiones />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Eventos />
      </Suspense>
      <Suspense fallback={<SectionSkeleton className="h-96" />}>
        <Ministerios />
      </Suspense>
      <HistoriaCTA />
      <Suspense fallback={<SectionSkeleton className="h-80" />}>
        <Noticias />
      </Suspense>
      <Contactenos />
    </>
  );
}
