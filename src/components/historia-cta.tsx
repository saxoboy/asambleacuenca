import Link from "next/link";

export default function HistoriaCTA() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Nuestra Historia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">La Iglesia</h2>
        <div className="mt-3 mb-8 mx-auto w-16 h-1 rounded-full bg-primary" />

        <p className="text-lg leading-relaxed text-muted-foreground mb-4">
          La Asamblea de Dios Ecuatoriana de Cuenca es una iglesia con décadas
          de historia en la ciudad, comprometida con el mensaje del Evangelio y
          con servir a su comunidad.
        </p>
        <p className="leading-relaxed text-muted-foreground mb-8">
          Fundada con la visión de ser un hogar espiritual para todos, nuestra
          iglesia ha crecido como familia que busca honrar a Dios en cada área
          de la vida.
        </p>

        <Link
          href="/web/historia"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Conoce nuestra historia
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
