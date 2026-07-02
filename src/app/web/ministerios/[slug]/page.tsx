export const revalidate = 3600;

import { client } from "@/sanity/client";
import { ministerioBySlugQuery, ministeriosQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, Users } from "lucide-react";
import GaleriaMinisterio from "@/components/galeria-ministerio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Permite rutas dinámicas no pre-generadas (cuando Sanity aún no está configurado)
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const ministerios = await client.fetch(ministeriosQuery);
    return ministerios.map((m: { slug: { current: string } }) => ({
      slug: m.slug.current,
    }));
  } catch {
    return [];
  }
}

export default async function MinisterioPage({ params }: PageProps) {
  const { slug } = await params;
  const [ministerio, todosLosMinisterios] = await Promise.all([
    client.fetch(ministerioBySlugQuery, { slug }),
    client.fetch(ministeriosQuery),
  ]);

  if (!ministerio) notFound();

  const otrosMinisterios = todosLosMinisterios.filter(
    (m: { slug: { current: string } }) => m.slug.current !== slug
  );

  return (
    <div className="min-h-screen">
      {/* Hero del ministerio */}
      <div className="relative h-64 md:h-80 bg-brand-navy overflow-hidden">
        {ministerio.imagenPortada?.asset && (
          <Image
            src={urlFor(ministerio.imagenPortada).width(1200).height(400).url()}
            alt={ministerio.nombre}
            fill
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-5xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="w-fit text-white/70 hover:text-white mb-4 -ml-2">
            <Link href="/web#ministerios">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Todos los ministerios
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{ministerio.nombre}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="md:col-span-2 space-y-8">
            {/* Descripción */}
            {ministerio.descripcion && (
              <div>
                <h2 className="text-xl font-bold mb-4">Acerca del Ministerio</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <PortableText value={ministerio.descripcion} />
                </div>
              </div>
            )}

            {/* Galería */}
            {ministerio.fotos?.some((f: { asset?: { _ref: string } }) => f?.asset) && (
              <div>
                <h2 className="text-xl font-bold mb-4">Galería</h2>
                <GaleriaMinisterio
                  fotos={ministerio.fotos
                    .filter((foto: { asset?: { _ref: string } }) => foto?.asset)
                    .map((foto: { asset: { _ref: string } }, i: number) => ({
                      url: urlFor(foto).width(1200).height(800).url(),
                      alt: `${ministerio.nombre} foto ${i + 1}`,
                    }))}
                />
              </div>
            )}

            {/* Placeholder si no hay contenido */}
            {!ministerio.descripcion && (
              <div className="text-center py-10 bg-card border border-border rounded-2xl">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  La información de este ministerio estará disponible pronto
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Líder + Horarios */}
          <div className="space-y-5">
            {/* Líder */}
            {ministerio.liderNombre && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Liderado por</h3>
                <div className="flex items-center gap-3">
                  {ministerio.liderFoto?.asset ? (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                      <Image
                        src={urlFor(ministerio.liderFoto).width(100).height(100).url()}
                        alt={ministerio.liderNombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{ministerio.liderNombre}</p>
                    <p className="text-xs text-muted-foreground">Líder del Ministerio</p>
                  </div>
                </div>
              </div>
            )}

            {/* Horarios */}
            {ministerio.horarios && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Horarios
                </h3>
                <p className="text-sm whitespace-pre-line">{ministerio.horarios}</p>
              </div>
            )}

            {/* CTA Contacto */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 text-center">
              <p className="text-sm font-medium mb-3">¿Te interesa participar?</p>
              <Button asChild size="sm" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
                <Link href="/web#contactenos">Contáctanos</Link>
              </Button>
            </div>

            {/* Otros ministerios */}
            {otrosMinisterios.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Otros ministerios
                </h3>
                <ul className="space-y-1">
                  {otrosMinisterios.map((m: { _id: string; nombre: string; slug: { current: string } }) => (
                    <li key={m._id}>
                      <Link
                        href={`/web/ministerios/${m.slug.current}`}
                        className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 rotate-180 shrink-0 text-muted-foreground" />
                        {m.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
