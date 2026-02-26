import { client } from "@/sanity/client";
import { historiaQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface HistoriaData {
  titulo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenido?: any[];
  fotosAntiguas?: Array<{ asset: { _ref: string }; caption?: string }>;
}

async function getHistoria(): Promise<HistoriaData | null> {
  try {
    return await client.fetch(historiaQuery);
  } catch {
    return null;
  }
}

// Agrupa bloques de imágenes consecutivos en un bloque "imageRow"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupConsecutiveImages(content: any[]): any[] {
  const result = [];
  let i = 0;
  while (i < content.length) {
    if (content[i]._type === "image") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const images: any[] = [];
      while (i < content.length && content[i]._type === "image") {
        images.push(content[i]);
        i++;
      }
      result.push({ _type: "imageRow", _key: `imageRow-${i}`, images });
    } else {
      result.push(content[i]);
      i++;
    }
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableTextComponents: any = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageRow: ({ value }: { value: { images: any[] } }) => (
      <div className="flex justify-around flex-wrap gap-y-4 mb-6">
        {value.images.map((img, idx) => {
          if (!img?.asset) return null;
          return (
            <figure key={idx} style={{ width: "min(340px, 100%)" }}>
              <div className="relative h-56 w-full rounded-xl overflow-hidden bg-muted shadow-md">
                <Image
                  src={urlFor(img).width(700).height(448).url()}
                  alt={img.caption || "Foto histórica"}
                  fill
                  className="object-cover sepia-[0.2] hover:sepia-0 transition-all duration-500"
                />
              </div>
              {img.caption && (
                <figcaption className="text-xs text-muted-foreground text-center mt-1 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    ),
  },
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normal: ({ children }: { children: any }) => (
      <p className="mb-4 text-base leading-relaxed">{children}</p>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: { children: any }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: { children: any }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
  },
};

export default async function Historia() {
  const historia = await getHistoria();

  return (
    <section id="historia" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Nuestra Historia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">La Iglesia</h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-primary" />
        </div>

        {historia?.contenido ? (
          <div className="text-foreground">
            <PortableText
              value={groupConsecutiveImages(historia.contenido)}
              components={portableTextComponents}
            />
          </div>
        ) : (
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              La Asamblea de Dios Ecuatoriana de Cuenca es una iglesia con
              décadas de historia en la ciudad, comprometida con el mensaje del
              Evangelio y con servir a su comunidad.
            </p>
            <p className="leading-relaxed">
              Fundada con la visión de ser un hogar espiritual para todos,
              nuestra iglesia ha crecido como familia que busca honrar a Dios
              en cada área de la vida.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
