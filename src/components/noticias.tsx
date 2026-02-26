import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { noticiasRecentesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { ArrowRight, Newspaper } from "lucide-react";
import { formatFecha } from "@/lib/format";

interface Noticia {
  _id: string;
  titulo: string;
  slug: { current: string };
  fecha: string;
  imagenPortada?: { asset: { _ref: string } };
  categoria?: { nombre: string; color: string };
}

async function getNoticias(): Promise<Noticia[]> {
  try {
    const data = await client.fetch(noticiasRecentesQuery);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Noticias() {
  // Fetches [0...4]: muestra 3, la 4ª indica si hay más
  const noticias = await getNoticias();
  const recientes = noticias.slice(0, 3);
  const hasMore = noticias.length === 4;

  if (recientes.length === 0) return null;

  return (
    <section id="noticias" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Noticias y Reseñas</h2>
          </div>
          {hasMore && (
            <Link
              href="/web/noticias"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recientes.map((noticia) => (
            <Link
              key={noticia._id}
              href={`/web/noticias/${noticia.slug.current}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-48 bg-muted overflow-hidden">
                {noticia.imagenPortada ? (
                  <Image
                    src={urlFor(noticia.imagenPortada).width(500).height(300).url()}
                    alt={noticia.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                )}
                {noticia.categoria && (
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white shadow"
                    style={{ backgroundColor: noticia.categoria.color || "#006096" }}
                  >
                    {noticia.categoria.nombre}
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-2">{formatFecha(noticia.fecha)}</p>
                <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {noticia.titulo}
                </h3>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                  Leer más
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ver todas (mobile) */}
        {hasMore && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/web/noticias"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Ver todas las noticias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
