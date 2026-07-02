import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, MapPin, Mic } from "lucide-react";
import InscripcionForm from "./inscripcion-form";

export const metadata: Metadata = {
  title: "Congreso IMPACTANTE | Asamblea de Dios Cuenca",
  description:
    "Inscríbete al congreso IMPACTANTE — donde tu fe se hace posible. 7 y 8 de agosto. Predicador: Pr. Rubén Silvera.",
};

export default function CongresoPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-brand-magenta/5 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:pt-16">
        <Image
          src="/images/impactante-logo.png"
          alt="Congreso IMPACTANTE"
          width={440}
          height={274}
          priority
          className="mx-auto h-auto w-64 sm:w-80"
        />
        <p className="mt-4 text-lg font-semibold uppercase tracking-wide text-brand-magenta">
          Donde tu fe se hace posible
        </p>
        <p className="mt-2 text-sm italic text-muted-foreground">
          &ldquo;Entonces respondiendo Jesús, dijo: Oh mujer, grande es tu fe;
          hágase contigo como quieres.&rdquo; — Mateo 15:28
        </p>

        {/* Datos del evento */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-magenta/10 px-4 py-2 font-medium text-brand-magenta-dark">
            <CalendarDays className="size-4" /> 7 y 8 de agosto
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-magenta/10 px-4 py-2 font-medium text-brand-magenta-dark">
            <Mic className="size-4" /> Pr. Rubén Silvera
          </span>
          {/* <span className="inline-flex items-center gap-2 rounded-full bg-brand-magenta/10 px-4 py-2 font-medium text-brand-magenta-dark">
            <Music className="size-4" /> Impactante — Ministerio Celeste
          </span> */}
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-magenta/10 px-4 py-2 font-medium text-brand-magenta-dark">
            <MapPin className="size-4" /> Auditorio Colegio Ciudad de Cuenca, Av de los Cerezos y Av. Ordoñez Lasso, Cuenca, Ecuador
          </span>
        </div>
      </section>

      {/* Formulario */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            Inscribe a tu grupo
          </h2>
          <p className="mt-2 text-muted-foreground">
            Completa los datos de tu iglesia y de cada asistente.
          </p>
        </div>
        <InscripcionForm />
      </section>
    </main>
  );
}
