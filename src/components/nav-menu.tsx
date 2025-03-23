import Link from "next/link";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const mainMenuItems = [
  { href: "/nosotros", label: "La Iglesia" },
  { href: "/ministerios", label: "Ministerios" },
  { href: "/eventos", label: "Eventos" },
  { href: "/horarios", label: "Horarios" },
  { href: "/contactos", label: "Contactos" },
];

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="font-display gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {mainMenuItems.map((item) => (
        <NavigationMenuItem key={item.href} >
          <NavigationMenuLink asChild className="text-base uppercase link-5 hover:bg-transparent">
            <Link href={item.href}>{item.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);