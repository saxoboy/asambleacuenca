import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { ministeriosQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { ArrowRight, Users } from "lucide-react";

interface Ministerio {
  _id: string;
  nombre: string;
  slug: { current: string };
  liderNombre?: string;
  imagenPortada?: { asset: { _ref: string } };
}

const ministeriosMock = [
  { slug: "alabanza", nombre: "Alabanza", liderNombre: "Líder por confirmar" },
  { slug: "escuela-dominical", nombre: "Escuela Dominical", liderNombre: "Líder por confirmar" },
  { slug: "damas", nombre: "Damas", liderNombre: "Líder por confirmar" },
  { slug: "caballeros", nombre: "Caballeros", liderNombre: "Líder por confirmar" },
  { slug: "jovenes-linaje", nombre: "Jóvenes — Linaje", liderNombre: "Líder por confirmar" },
  { slug: "linaje-teens", nombre: "Linaje Teens", liderNombre: "Líder por confirmar" },
  { slug: "patrulla-del-rey", nombre: "Patrulla del Rey", liderNombre: "Líder por confirmar" },
  { slug: "congregaciones", nombre: "Congregaciones", liderNombre: "Líder por confirmar" },
  { slug: "consejeria", nombre: "Consejería", liderNombre: "Líder por confirmar" },
  { slug: "diaconado", nombre: "Diaconado", liderNombre: "Líder por confirmar" },
  { slug: "protocolo", nombre: "Protocolo", liderNombre: "Líder por confirmar" },
];

export default async function MinisteriosPage() {
  const sanityData: Ministerio[] = await client.fetch(ministeriosQuery).catch(() => []);

  const items =
    sanityData.length > 0
      ? sanityData.map((m) => ({
          slug: m.slug.current,
          nombre: m.nombre,
          liderNombre: m.liderNombre,
          imagenPortada: m.imagenPortada,
        }))
      : ministeriosMock;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Comunidad
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">Ministerios</h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Cada ministerio es un espacio de servicio, crecimiento y comunidad dentro de la iglesia
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((ministerio) => (
            <Link
              key={ministerio.slug}
              href={`/web/ministerios/${ministerio.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-44 bg-muted overflow-hidden">
                {"imagenPortada" in ministerio && ministerio.imagenPortada ? (
                  <Image
                    src={urlFor(ministerio.imagenPortada).width(400).height(300).url()}
                    alt={ministerio.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <Users className="w-12 h-12 text-primary/40" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-bold text-base group-hover:text-primary transition-colors">
                  {ministerio.nombre}
                </h2>
                {ministerio.liderNombre && (
                  <p className="text-xs text-muted-foreground mt-1">{ministerio.liderNombre}</p>
                )}
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                  Ver ministerio
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
