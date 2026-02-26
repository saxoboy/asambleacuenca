import Historia from "@/components/historia";

export const metadata = {
  title: "La Iglesia — Asamblea de Dios Cuenca",
  description: "Historia y trayectoria de la Asamblea de Dios Ecuatoriana en Cuenca, Ecuador",
};

export default function HistoriaPage() {
  return (
    <div className="min-h-screen py-8">
      <Historia />
    </div>
  );
}
