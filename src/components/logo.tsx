import Image from "next/image";

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