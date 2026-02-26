import { FaWhatsapp } from "react-icons/fa6";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WHATSAPP_NUMBER = "593984168551";
const WHATSAPP_MSG = encodeURIComponent(
  "¡Hola! Me gustaría obtener más información sobre la iglesia."
);

const horarios = [
  { dia: "Domingos", horas: "08:00 · 09:45 · 11:30" },
  { dia: "Lunes", horas: "14:30 Damas · 19:30 Caballeros" },
  { dia: "Miércoles", horas: "19:00" },
  { dia: "Viernes", horas: "19:00" },
  { dia: "Sábados", horas: "10:00 Niños · 14:00 Teens · 16:30 Jóvenes" },
];

export default function Contactenos() {
  return (
    <section id="contactenos" className="py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Encuéntranos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Contáctenos</h2>
          <p className="mt-2 text-muted-foreground">Estamos en Cuenca, Ecuador — ¡te esperamos!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info de contacto */}
          <div className="space-y-6">
            {/* Dirección */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dirección</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Río Cutucu y Rumi Urco<br />
                    (junto a la central telefónica de Totoracocha)<br />
                    Cuenca — Ecuador
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teléfonos</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">Tel:</span>{" "}
                    <a href="tel:072861443" className="hover:text-primary transition-colors">
                      07 286 1443
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    <span className="text-foreground font-medium">Cel:</span>{" "}
                    <a href="tel:+593984168551" className="hover:text-primary transition-colors">
                      +593 98 416 8551
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Horarios de Cultos
              </h3>
              <div className="space-y-2">
                {horarios.map(({ dia, horas }) => (
                  <div key={dia} className="flex justify-between items-start text-sm gap-4">
                    <span className="font-medium flex-shrink-0">{dia}</span>
                    <span className="text-muted-foreground text-right">{horas}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón WhatsApp */}
            <Button
              asChild
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold gap-2 rounded-2xl"
            >
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-xl" />
                Escríbenos por WhatsApp
              </Link>
            </Button>
          </div>

          {/* Mapa de Google */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm min-h-80">
            <iframe
              src="https://maps.google.com/maps?q=R%C3%ADo+Cutucu+y+Rumi+Urco+Totoracocha+Cuenca+Ecuador&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: "320px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Asamblea de Dios Cuenca"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
