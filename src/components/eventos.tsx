import { client } from "@/sanity/client";
import { eventosProximosQuery } from "@/sanity/queries";
import { CalendarDays, Clock } from "lucide-react";

interface CategoriaEvento {
  nombre: string;
  color: string;
}

interface Evento {
  _id: string;
  titulo: string;
  fecha: string;
  hora?: string;
  categoria?: CategoriaEvento;
  descripcion?: string;
}

async function getEventos(): Promise<Evento[]> {
  try {
    const hoy = new Date().toISOString().split("T")[0];
    return await client.fetch(eventosProximosQuery, { hoy });
  } catch {
    return [];
  }
}

function formatFecha(fechaStr: string) {
  const fecha = new Date(fechaStr + "T00:00:00");
  return fecha.toLocaleDateString("es-EC", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default async function Eventos() {
  const eventos = await getEventos();

  return (
    <section id="eventos" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Agenda
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Próximos Eventos</h2>
          <p className="mt-2 text-muted-foreground">
            Actividades especiales de la iglesia
          </p>
        </div>

        {eventos.length > 0 ? (
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div
                key={evento._id}
                className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                {/* Fecha */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4 w-20 text-center">
                  <span className="text-2xl font-extrabold text-primary leading-none">
                    {new Date(evento.fecha + "T00:00:00").getDate()}
                  </span>
                  <span className="text-xs uppercase font-semibold text-muted-foreground mt-0.5">
                    {new Date(evento.fecha + "T00:00:00").toLocaleDateString("es-EC", { month: "short" })}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base">{evento.titulo}</h3>
                    {evento.categoria && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: evento.categoria.color || "#006096" }}
                      >
                        {evento.categoria.nombre}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatFecha(evento.fecha)}
                    </span>
                    {evento.hora && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {evento.hora}
                      </span>
                    )}
                  </div>
                  {evento.descripcion && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {evento.descripcion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-lg">No hay eventos próximos por el momento</p>
            <p className="text-sm text-muted-foreground mt-1">Los eventos especiales se anunciarán aquí</p>
          </div>
        )}
      </div>
    </section>
  );
}
