import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";
import { EN_VIVO_DURACION_MS } from "@/lib/constants";
import { groq } from "next-sanity";

const transmisionActivaQuery = groq`
  *[_type == "transmision" && activa == true][0] {
    _id, _updatedAt
  }
`;

export async function GET(request: Request) {
  // Verificar que la llamada viene de Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transmision = await writeClient.fetch(transmisionActivaQuery).catch(() => null);

  if (!transmision) {
    return NextResponse.json({ message: "Sin transmisión activa" });
  }

  const transcurrido = Date.now() - new Date(transmision._updatedAt).getTime();

  if (transcurrido < EN_VIVO_DURACION_MS) {
    const minRestantes = Math.round((EN_VIVO_DURACION_MS - transcurrido) / 60000);
    return NextResponse.json({ message: `Aún en vivo. Faltan ~${minRestantes} min` });
  }

  // Desactivar la transmisión
  await writeClient.patch(transmision._id).set({ activa: false }).commit();

  return NextResponse.json({ message: `Transmisión ${transmision._id} desactivada` });
}
