import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroMain = () => {
  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Video de fondo */}
      <video
        src="/videos/intro-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
      />

      {/* Overlay degradado azul marino */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/90" />

      {/* Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <div className="mb-6 animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
          <Image
            src="/images/logo-asamblea-26.png"
            alt="Asamblea de Dios Cuenca"
            width={120}
            height={120}
            className="object-contain w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
            priority
          />
        </div>

        {/* Título principal */}
        <h1 className="animate-slide-up opacity-0 delay-200 text-white font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight drop-shadow-lg"
          style={{ animationFillMode: "forwards" }}>
          Asamblea de Dios <br className="hidden sm:block" />
          <span className="text-brand-blue">Ecuatoriana</span> de Cuenca
        </h1>

        {/* Slogan */}
        <p className="animate-slide-up opacity-0 delay-400 mt-4 text-white/80 text-lg sm:text-xl md:text-2xl font-light italic tracking-wide"
          style={{ animationFillMode: "forwards" }}>
          un hogar para ti...
        </p>

        {/* Botones de acción */}
        <div className="animate-slide-up opacity-0 delay-500 mt-8 flex flex-col sm:flex-row gap-4"
          style={{ animationFillMode: "forwards" }}>
          <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-8">
            <Link href="/web#contactenos">Visítanos</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white font-semibold px-8">
            <Link href="/web#transmisiones">Ver en Vivo</Link>
          </Button>
        </div>
      </div>

      {/* Flecha de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroMain;
