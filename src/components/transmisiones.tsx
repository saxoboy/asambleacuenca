import { client } from "@/sanity/client";
import { transmisionActivaQuery, transmisionesRecentesQuery } from "@/sanity/queries";
import { FaYoutube, FaFacebook } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Transmision {
  _id: string;
  titulo: string;
  url: string;
  plataforma: "youtube" | "facebook";
  activa: boolean;
  fecha: string;
  _updatedAt: string;
}

const EN_VIVO_DURACION_MS = 105 * 60 * 1000; // 1h 45min

function estaEnVivo(transmision: Transmision): boolean {
  if (!transmision.activa) return false;
  const transcurrido = Date.now() - new Date(transmision._updatedAt).getTime();
  return transcurrido < EN_VIVO_DURACION_MS;
}

function getYoutubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com"))
      return u.searchParams.get("v") ?? u.pathname.split("/").at(-1) ?? null;
    return null;
  } catch {
    return null;
  }
}

function getYoutubeThumbnail(url: string): string | null {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function formatFecha(fechaStr: string) {
  return new Date(fechaStr).toLocaleDateString("es-EC", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Transmisiones() {
  const [transmision, recientes] = await Promise.all([
    client.fetch(transmisionActivaQuery).catch(() => null),
    client.fetch(transmisionesRecentesQuery).catch(() => [] as Transmision[]),
  ]);

  const enVivo = transmision ? estaEnVivo(transmision) : false;

  // ─── URL de embed ─────────────────────────────────────
  let embedUrl: string | null = null;
  if (enVivo && transmision) {
    if (transmision.plataforma === "youtube") {
      const id = getYoutubeVideoId(transmision.url);
      if (id) embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
    } else {
      const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(transmision.url)}&show_text=false&appId=${fbAppId}`;
    }
  }

  return (
    <section id="transmisiones" className="py-16 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Transmisiones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">En Vivo y Grabaciones</h2>
          <p className="mt-2 text-muted-foreground">
            Síguenos en nuestras transmisiones semanales
          </p>
        </div>

        {enVivo && transmision && embedUrl ? (
          /* ─── ESTADO EN VIVO: iframe ─── */
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            {/* Badge + info */}
            <div className="px-6 pt-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                EN VIVO
              </span>
              {transmision.plataforma === "youtube" ? (
                <FaYoutube className="text-red-600 text-2xl" />
              ) : (
                <FaFacebook className="text-blue-600 text-2xl" />
              )}
            </div>
            <div className="px-6 py-3">
              <h3 className="text-lg font-semibold">{transmision.titulo}</h3>
            </div>

            {/* iframe responsive 16:9 */}
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={transmision.titulo}
              />
            </div>

            {/* Botón externo como respaldo */}
            <div className="px-6 py-4 text-center">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={transmision.url} target="_blank" rel="noopener noreferrer">
                  {transmision.plataforma === "youtube" ? (
                    <FaYoutube className="text-red-600" />
                  ) : (
                    <FaFacebook className="text-blue-600" />
                  )}
                  Abrir en {transmision.plataforma === "youtube" ? "YouTube" : "Facebook"}
                </Link>
              </Button>
            </div>
          </div>
        ) : recientes && recientes.length > 0 ? (
          /* ─── ESTADO NO EN VIVO: mini-galería ─── */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(recientes as Transmision[]).map((t) => {
                const thumb = t.plataforma === "youtube" ? getYoutubeThumbnail(t.url) : null;
                return (
                  <Link
                    key={t._id}
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-shadow duration-300"
                  >
                    {/* Miniatura */}
                    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt={t.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-navy flex items-center justify-center">
                          <FaFacebook className="text-white/40 text-4xl" />
                        </div>
                      )}
                      <span className="absolute bottom-2 right-2">
                        {t.plataforma === "youtube" ? (
                          <FaYoutube className="text-xl text-red-600 drop-shadow" />
                        ) : (
                          <FaFacebook className="text-xl text-blue-600 drop-shadow" />
                        )}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {t.titulo}
                      </p>
                      {t.fecha && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatFecha(t.fecha)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA ver todas */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm mb-3">
                ¿Te perdiste algún culto? Mira todas nuestras transmisiones grabadas.
              </p>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/web/transmisiones">
                  Ver todas las transmisiones
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          /* ─── Sin datos ─── */
          <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
            <div className="flex gap-4 text-4xl text-muted-foreground">
              <FaYoutube className="text-red-400" />
              <FaFacebook className="text-blue-400" />
            </div>
            <p className="text-muted-foreground text-lg">
              Próximamente — Los cultos se transmiten en vivo cada semana
            </p>
            <p className="text-sm text-muted-foreground">
              Domingos 08:00 · 09:45 · 11:30 &nbsp;|&nbsp; Miércoles y Viernes 19:00
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
