import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import { transmisionActivaQuery } from "@/sanity/queries";

const EN_VIVO_DURACION_MS = 105 * 60 * 1000; // 1h 45min

async function getEnVivo(): Promise<boolean> {
  try {
    const t = await client.fetch(transmisionActivaQuery);
    if (!t?.activa) return false;
    const transcurrido = Date.now() - new Date(t._updatedAt).getTime();
    return transcurrido < EN_VIVO_DURACION_MS;
  } catch {
    return false;
  }
}

const HeroMain = async () => {
  const enVivo = await getEnVivo();

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
        aria-hidden="true"
      />

      {/* Overlay degradado azul marino */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/90" />

      {/* Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Logo */}
        <div className="mb-6 animate-fade-in opacity-0 w-96" style={{ animationFillMode: "forwards" }}>
          <Image
            src="/images/logo-asamblea-cuenca-white.png"
            alt="Asamblea de Dios Cuenca"
            width={350}
            height={350}
            className="object-contain w-auto"
            priority
          />
        </div>

        {/* Título principal */}
        <h1 className="animate-slide-up opacity-0 delay-200 text-white font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight drop-shadow-lg"
          style={{ animationFillMode: "forwards" }}>
          Iglesia Evangélica <br className="hidden sm:block" /><span className="text-brand-blue text-shadow-2xs">Asamblea de Dios Ecuatoriana</span><br className="hidden sm:block" /> de Cuenca
        </h1>

        {/* Slogan */}
        <p className="animate-slide-up opacity-0 delay-400 mt-4 text-white/80 text-lg sm:text-xl md:text-2xl font-light italic tracking-wide"
          style={{ animationFillMode: "forwards" }}>
          un hogar para ti...
        </p>

        {/* Botones de acción */}
        <div className="animate-slide-up opacity-0 delay-500 mt-8 flex flex-col sm:flex-row gap-4"
          style={{ animationFillMode: "forwards" }}>
          <Button asChild size="lg" className="hover:bg-brand-navy">
            <Link href="/web#contactenos">Visítanos</Link>
          </Button>
          {enVivo && (
            <Button asChild size="lg" variant="destructive" className="relative">
              <Link href="/web#transmisiones">
                <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-700" />
                </span>
                En vivo ahora!
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Flecha de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroMain;
