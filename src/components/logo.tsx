import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <div className="relative w-48">
    <Image
      src="/images/logo-asamblea-26.png"
      alt="Asamblea de Dios Cuenca"
      width={200}
      height={200}
      className="object-contain w-auto h-auto"
      priority
    />
  </div>
);

export const LogoMain = () => (
  <div className="relative w-64 py-2">
    <Link href="/web" title="Ir a la página de inicio">
      {/* Modo claro */}
      <Image
        src="/images/logo-asamblea-cuenca.png"
        alt="Asamblea de Dios Cuenca"
        width={240}
        height={240}
        className="object-contain w-auto h-12 dark:hidden"
        priority
      />
      {/* Modo oscuro */}
      <Image
        src="/images/logo-asamblea-cuenca-white.png"
        alt="Asamblea de Dios Cuenca"
        width={240}
        height={240}
        className="object-contain w-auto h-12 hidden dark:block"
        priority
      />
    </Link>
  </div>
);
