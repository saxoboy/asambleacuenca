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
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-navy via-[#5c1746] to-brand-magenta-dark">
        {/* Resplandor decorativo */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-magenta/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-brand-magenta/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 pt-14 pb-16 text-center sm:pt-20">
          <div className="mx-auto inline-block rounded-2xl bg-white p-4 shadow-lg shadow-black/20">
            <Image
              src="/images/impactante-logo.png"
              alt="Congreso IMPACTANTE"
              width={440}
              height={274}
              priority
              className="mx-auto h-auto w-52 sm:w-64"
            />
          </div>

          <p className="mt-6 text-base font-semibold uppercase tracking-[0.2em] text-white sm:text-lg">
            Donde tu fe se hace posible
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm italic text-white/75">
            &ldquo;Entonces respondiendo Jesús, dijo: Oh mujer, grande es tu fe;
            hágase contigo como quieres.&rdquo; — Mateo 15:28
          </p>

          {/* Datos del evento */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/25 backdrop-blur-sm">
              <CalendarDays className="size-4" /> 7 y 8 de agosto
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/25 backdrop-blur-sm">
              <Mic className="size-4" /> Pr. Rubén Silvera
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/25 backdrop-blur-sm">
              <MapPin className="size-4" /> Av de los Cerezos y Av. Ordoñez
              Lasso, Cuenca, Ecuador
            </span>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            Inscribe a tu grupo
          </h2>
          <p className="mt-2 text-slate-500">
            Completa los datos de tu iglesia y de cada asistente.
          </p>
        </div>
        <InscripcionForm />
      </section>
    </main>
  );
}
