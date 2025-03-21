import Image from "next/image";

export const Logo = () => (
  <div className="relative w-48 h-48">
    <Image
      src="/images/logo-asamblea.png"
      alt="Iglesia Evangélica Asamblea de Dios Ecuatoriana de Cuenca - Ecuador"
      // width={125}
      // height={80}
      // className="w-auto h-auto my-2 ml-0 md:ml-4"
      fill
      className="object-contain"
      priority
    />
  </div>
);