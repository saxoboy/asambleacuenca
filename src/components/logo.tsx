import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <div className="relative w-48">
    <Image
      src="/images/logo-asamblea.png"
      alt="Iglesia Evangélica Asamblea de Dios Ecuatoriana de Cuenca - Ecuador"
      width={200}
      height={200}
      // className="w-auto h-auto my-2 ml-0 md:ml-4"
      className="object-contain w-auto h-auto"
      priority
    />
  </div>
);

export const LogoMain = () => (
  <div className="relative w-26 py-2">
    <Link href="/" title="Ir a la página de inicio">
      <Image
        src="/images/logo-asamblea.png"
        alt="Iglesia Evangélica Asamblea de Dios Ecuatoriana de Cuenca - Ecuador"
        width={150}
        height={150}
        className="object-contain w-auto h-auto"
        priority
      />
    </Link>
  </div>
)