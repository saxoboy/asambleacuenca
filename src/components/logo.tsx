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
  <div className="relative w-26 py-2">
    <Link href="/web" title="Ir a la página de inicio">
      <Image
        src="/images/logo-asamblea-26.png"
        alt="Asamblea de Dios Cuenca"
        width={120}
        height={120}
        className="object-contain w-auto h-12"
        priority
      />
    </Link>
  </div>
);
