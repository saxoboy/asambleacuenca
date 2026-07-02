import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Asistente = {
  nombre: string;
  apellido: string;
};

type Inscripcion = {
  ministerio: string;
  ciudad: string;
  lider: string;
  pastor: string;
  numAsistentes: string;
  asistentes: Asistente[];
  especialUrl: string;
  instrumentos: string;
  consentimiento: boolean;
};

export async function POST(request: Request) {
  const url = process.env.CONGRESO_APPS_SCRIPT_URL;
  if (!url) {
    return NextResponse.json(
      { error: "El formulario aún no está configurado. Contacta al administrador." },
      { status: 503 },
    );
  }

  let data: Inscripcion;
  try {
    data = (await request.json()) as Inscripcion;
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // Validaciones mínimas del servidor
  if (
    !data.ministerio?.trim() ||
    !data.ciudad?.trim() ||
    !data.lider?.trim() ||
    !data.pastor?.trim() ||
    !String(data.numAsistentes ?? "").trim()
  ) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios del grupo." },
      { status: 400 },
    );
  }
  if (!data.consentimiento) {
    return NextResponse.json(
      { error: "Debes aceptar el consentimiento de datos." },
      { status: 400 },
    );
  }
  const asistentes = (data.asistentes ?? []).filter(
    (a) => a.nombre?.trim() || a.apellido?.trim(),
  );
  if (asistentes.length === 0) {
    return NextResponse.json(
      { error: "Agrega al menos un asistente." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, asistentes }),
      // Apps Script redirige a googleusercontent.com; fetch sigue el redirect
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "No se pudo guardar la inscripción. Intenta de nuevo." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error de conexión con el servidor. Intenta de nuevo." },
      { status: 502 },
    );
  }
}
