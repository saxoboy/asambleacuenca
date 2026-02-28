import { client } from "@/sanity/client";
import { transmisionesQuery } from "@/sanity/queries";
import { FaYoutube, FaFacebook } from "react-icons/fa6";
import Link from "next/link";

interface Transmision {
  _id: string;
  titulo: string;
  url: string;
  plataforma: "youtube" | "facebook";
  activa: boolean;
  fecha: string;
  _updatedAt: string;
}

async function getTransmisiones(): Promise<Transmision[]> {
  try {
    return await client.fetch(transmisionesQuery);
  } catch {
    return [];
  }
}

const EN_VIVO_MS = 105 * 60 * 1000; // 1h 45min

function estaEnVivo(t: Transmision): boolean {
  if (!t.activa) return false;
  return Date.now() - new Date(t._updatedAt).getTime() < EN_VIVO_MS;
}

function getYoutubeThumbnail(url: string): string | null {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      id = u.searchParams.get("v") ?? u.pathname.split("/").at(-1) ?? null;
    }
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

function formatFecha(fechaStr: string) {
  return new Date(fechaStr).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function TransmisionesPage() {
  const transmisiones = await getTransmisiones();

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Canal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">Transmisiones</h1>
          <p className="mt-2 text-muted-foreground">
            Cultos y mensajes de nuestra iglesia
          </p>
        </div>

        {transmisiones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transmisiones.map((t) => {
              const enVivo = estaEnVivo(t);
              const thumbUrl = t.plataforma === "youtube" ? getYoutubeThumbnail(t.url) : null;

              return (
                <Link
                  key={t._id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-shadow duration-300"
                >
                  {/* Miniatura */}
                  <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                    {thumbUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbUrl}
                        alt={t.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-navy flex items-center justify-center">
                        <FaFacebook className="text-white/40 text-5xl" />
                      </div>
                    )}

                    {/* Badge EN VIVO */}
                    {enVivo && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                        EN VIVO
                      </span>
                    )}

                    {/* Ícono plataforma */}
                    <span className="absolute bottom-2 right-2">
                      {t.plataforma === "youtube" ? (
                        <FaYoutube className="text-2xl text-red-600 drop-shadow" />
                      ) : (
                        <FaFacebook className="text-2xl text-blue-600 drop-shadow" />
                      )}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h2 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {t.titulo}
                    </h2>
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
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <div className="flex justify-center gap-4 text-4xl text-muted-foreground mb-4">
              <FaYoutube className="text-red-400" />
              <FaFacebook className="text-blue-400" />
            </div>
            <p className="text-muted-foreground text-lg">
              Aún no hay transmisiones registradas
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
