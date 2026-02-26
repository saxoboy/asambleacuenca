import { client } from "@/sanity/client";
import { noticiaBySlugQuery, noticiasQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalendarDays } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const noticias = await client.fetch(noticiasQuery);
    return noticias.map((n: { slug: { current: string } }) => ({
      slug: n.slug.current,
    }));
  } catch {
    return [];
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const noticia = await client.fetch(noticiaBySlugQuery, { slug }).catch(() => null);

  if (!noticia) notFound();

  const fecha = new Date(noticia.fecha + "T00:00:00").toLocaleDateString("es-EC", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 bg-brand-navy overflow-hidden">
        {noticia.imagenPortada && (
          <Image
            src={urlFor(noticia.imagenPortada).width(1200).height(500).url()}
            alt={noticia.titulo}
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-3xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="w-fit text-white/70 hover:text-white mb-4 -ml-2">
            <Link href="/web/noticias">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Todas las noticias
            </Link>
          </Button>
          {noticia.categoria && (
            <span
              className="w-fit text-xs font-semibold px-2.5 py-1 rounded-full text-white mb-3"
              style={{ backgroundColor: noticia.categoria.color || "#006096" }}
            >
              {noticia.categoria.nombre}
            </span>
          )}
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{noticia.titulo}</h1>
          <p className="mt-2 text-white/70 flex items-center gap-1.5 text-sm">
            <CalendarDays className="w-4 h-4" />
            {fecha}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Contenido rich text */}
        {noticia.descripcion && (
          <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
            <PortableText value={noticia.descripcion} />
          </div>
        )}

        {/* Galería */}
        {noticia.galeria?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-5">Galería de Fotos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {noticia.galeria.map((foto: { asset: { _ref: string } }, i: number) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={urlFor(foto).width(400).height(400).url()}
                    alt={`Foto ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volver */}
        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild variant="outline">
            <Link href="/web/noticias">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Ver todas las noticias
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
