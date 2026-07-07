"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENTIMIENTO_TEXTO = `En concordancia con el numeral 1 del Art. 7 de la Ley Orgánica de Protección de Datos Personales, declaro expresamente que de manera libre, voluntaria e inequívoca, AUTORIZO a la Iglesia Evangélica Asamblea de Dios Ecuatoriana, para que en los términos legalmente establecidos en la Constitución de la República del Ecuador, Ley Orgánica de Protección de Datos Personales, Ley Orgánica de Transparencia y Acceso a la Información Pública y demás normativa secundaria sobre estas materias, realice el tratamiento de mis datos personales, entendido como la recopilación, registro, organización, actualización, procesamiento, reproducción, compilación, almacenamiento, circulación, publicación y sistematización de mi información personal en las bases de datos físicas o electrónicas automatizadas o semiautomatizadas que la Iglesia Evangélica Asamblea de Dios posea para el presente evento.`;

type Asistente = { nombre: string; apellido: string };

const asistenteVacio = (): Asistente => ({
  nombre: "",
  apellido: "",
});

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/30 placeholder:text-slate-400";

const labelClass = "mb-1.5 block text-sm font-medium text-brand-navy";

export default function InscripcionForm() {
  const [ministerio, setMinisterio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [lider, setLider] = useState("");
  const [pastor, setPastor] = useState("");
  const [numAsistentes, setNumAsistentes] = useState("");
  const [asistentes, setAsistentes] = useState<Asistente[]>([asistenteVacio()]);
  const [especialUrl, setEspecialUrl] = useState("");
  const [instrumentos, setInstrumentos] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const actualizarAsistente = (
    index: number,
    campo: keyof Asistente,
    valor: string,
  ) => {
    setAsistentes((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [campo]: valor } : a)),
    );
  };

  const agregarAsistente = () =>
    setAsistentes((prev) => [...prev, asistenteVacio()]);

  const quitarAsistente = (index: number) =>
    setAsistentes((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !ministerio.trim() ||
      !ciudad.trim() ||
      !lider.trim() ||
      !pastor.trim() ||
      !numAsistentes.trim()
    ) {
      setError("Completa todos los datos obligatorios del grupo.");
      return;
    }
    const asistentesValidos = asistentes.filter(
      (a) => a.nombre.trim() || a.apellido.trim(),
    );
    if (asistentesValidos.length === 0) {
      setError("Agrega al menos un asistente.");
      return;
    }
    if (!consentimiento) {
      setError("Debes aceptar el consentimiento de tratamiento de datos.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ministerio,
          ciudad,
          lider,
          pastor,
          numAsistentes,
          asistentes: asistentesValidos,
          especialUrl,
          instrumentos,
          consentimiento,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar la inscripción.");
      }
      setExito(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar.");
    } finally {
      setEnviando(false);
    }
  };

  if (exito) {
    return (
      <div className="rounded-2xl border border-brand-magenta/20 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 size-14 text-brand-magenta" />
        <h3 className="text-2xl font-bold text-brand-navy">
          ¡Inscripción recibida!
        </h3>
        <p className="mt-2 text-slate-500">
          Gracias por inscribir a tu grupo al congreso{" "}
          <strong>IMPACTANTE</strong>. Nos vemos el 7 y 8 de agosto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-brand-navy/5 sm:p-8"
    >
      {/* Datos del grupo */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold text-brand-magenta">
          Datos del grupo
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Ministerio <span className="text-brand-magenta">*</span>
            </label>
            <input
              className={inputClass}
              value={ministerio}
              onChange={(e) => setMinisterio(e.target.value)}
              placeholder="Nombre del ministerio"
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Ciudad <span className="text-brand-magenta">*</span>
            </label>
            <input
              className={inputClass}
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ciudad"
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Líder / Encargado <span className="text-brand-magenta">*</span>
            </label>
            <input
              className={inputClass}
              value={lider}
              onChange={(e) => setLider(e.target.value)}
              placeholder="Nombre del líder o encargado"
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              Pastor <span className="text-brand-magenta">*</span>
            </label>
            <input
              className={inputClass}
              value={pastor}
              onChange={(e) => setPastor(e.target.value)}
              placeholder="Nombre del pastor"
              required
            />
          </div>
          <div>
            <label className={labelClass}>
              # de asistentes <span className="text-brand-magenta">*</span>
            </label>
            <input
              type="number"
              min={1}
              className={inputClass}
              value={numAsistentes}
              onChange={(e) => setNumAsistentes(e.target.value)}
              placeholder="Ej: 12"
              required
            />
          </div>
        </div>
      </fieldset>

      {/* Asistentes */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold text-brand-magenta">
          Inscribe a cada asistente
        </legend>
        <div className="space-y-3">
          {asistentes.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
            >
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  className={inputClass}
                  value={a.nombre}
                  onChange={(e) =>
                    actualizarAsistente(i, "nombre", e.target.value)
                  }
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className={labelClass}>Apellido</label>
                <input
                  className={inputClass}
                  value={a.apellido}
                  onChange={(e) =>
                    actualizarAsistente(i, "apellido", e.target.value)
                  }
                  placeholder="Apellido"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => quitarAsistente(i)}
                disabled={asistentes.length === 1}
                aria-label="Quitar asistente"
                className="text-brand-magenta hover:bg-brand-magenta/10 hover:text-brand-magenta-dark"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={agregarAsistente}
          className="border-brand-magenta/40 bg-white text-brand-magenta hover:bg-brand-magenta/10 hover:text-brand-magenta-dark"
        >
          <Plus className="size-4" /> Añadir asistente
        </Button>
      </fieldset>

      {/* Especial + instrumentos */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-bold text-brand-magenta">
          Participación especial
        </legend>
        <div>
          <label className={labelClass}>
            Si tu iglesia participará con un especial, pega el enlace del
            archivo (MP3 / MP4)
          </label>
          <input
            type="url"
            className={inputClass}
            value={especialUrl}
            onChange={(e) => setEspecialUrl(e.target.value)}
            placeholder="Enlace de Google Drive, WeTransfer, YouTube…"
          />
          <p className="mt-1 text-xs text-slate-500">
            Sube tu archivo a Google Drive o WeTransfer y pega aquí el enlace
            para compartir.
          </p>
        </div>
        <div>
          <label className={labelClass}>
            Si tu presentación es en vivo, describe qué instrumentos necesitas
          </label>
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            value={instrumentos}
            onChange={(e) => setInstrumentos(e.target.value)}
            placeholder="Ej: 1 teclado, 2 micrófonos, 1 guitarra acústica…"
          />
        </div>
      </fieldset>

      {/* Consentimiento */}
      <fieldset>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <input
            type="checkbox"
            checked={consentimiento}
            onChange={(e) => setConsentimiento(e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-brand-magenta"
          />
          <span className="text-xs leading-relaxed text-slate-500">
            {CONSENTIMIENTO_TEXTO}
          </span>
        </label>
      </fieldset>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={enviando}
        className="w-full bg-brand-magenta text-white hover:bg-brand-magenta-dark sm:w-auto"
      >
        {enviando && <Loader2 className="size-4 animate-spin" />}
        {enviando ? "Enviando…" : "Enviar inscripción"}
      </Button>
    </form>
  );
}
