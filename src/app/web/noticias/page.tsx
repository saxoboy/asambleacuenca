import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { noticiasQuery } from "@/sanity/queries";
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

export default async function NoticiasPage() {
  const noticias: Noticia[] = await client.fetch(noticiasQuery).catch(() => []);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Blog
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">Noticias y Reseñas</h1>
          <p className="mt-2 text-muted-foreground">
            Reseñas de nuestros eventos y vida de la iglesia
          </p>
        </div>

        {noticias.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <Link
                key={noticia._id}
                href={`/web/noticias/${noticia.slug.current}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
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
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">{formatFecha(noticia.fecha)}</p>
                  <h2 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {noticia.titulo}
                  </h2>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                    Leer más
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg">No hay noticias publicadas aún</p>
          </div>
        )}
      </div>
    </div>
  );
}
