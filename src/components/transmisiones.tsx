import { client } from "@/sanity/client";
import { transmisionActivaQuery } from "@/sanity/queries";
import { FaYoutube, FaFacebook } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Transmision {
  _id: string;
  titulo: string;
  url: string;
  plataforma: "youtube" | "facebook";
  activa: boolean;
  fecha: string;
}

async function getTransmision(): Promise<Transmision | null> {
  try {
    return await client.fetch(transmisionActivaQuery);
  } catch {
    return null;
  }
}

export default async function Transmisiones() {
  const transmision = await getTransmision();

  return (
    <section id="transmisiones" className="py-16 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Encabezado */}
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Transmisiones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">En Vivo y Grabaciones</h2>
          <p className="mt-2 text-muted-foreground">
            Síguenos en nuestras transmisiones semanales
          </p>
        </div>

        {transmision ? (
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            {/* Badge EN VIVO o ÚLTIMA TRANSMISIÓN */}
            <div className="px-6 pt-5 flex items-center gap-3">
              {transmision.activa ? (
                <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                  EN VIVO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Última transmisión
                </span>
              )}
              {/* Icono plataforma */}
              {transmision.plataforma === "youtube" ? (
                <FaYoutube className="text-red-600 text-2xl" />
              ) : (
                <FaFacebook className="text-blue-600 text-2xl" />
              )}
            </div>

            {/* Título */}
            <div className="px-6 py-3 text-left">
              <h3 className="text-lg font-semibold">{transmision.titulo}</h3>
              {transmision.fecha && (
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(transmision.fecha).toLocaleDateString("es-EC", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Botón */}
            <div className="px-6 pb-6">
              <Button asChild size="lg" className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold gap-2">
                <Link href={transmision.url} target="_blank" rel="noopener noreferrer">
                  {transmision.plataforma === "youtube" ? (
                    <FaYoutube className="text-lg" />
                  ) : (
                    <FaFacebook className="text-lg" />
                  )}
                  {transmision.activa ? "Ver en Vivo" : "Ver Grabación"}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          /* Sin transmisión cargada */
          <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4">
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
