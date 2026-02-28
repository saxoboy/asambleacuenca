"use client";

import Link from "next/link";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const mainMenuItems = [
  { href: "/web/historia", label: "La Iglesia" },
  { href: "/web/ministerios", label: "Ministerios" },
  { href: "/web#eventos", label: "Eventos" },
  { href: "/web/transmisiones", label: "Transmisiones" },
  { href: "/web/noticias", label: "Noticias" },
  { href: "/web#contactenos", label: "Contacto" },
];

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="font-display gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {mainMenuItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuLink asChild className="text-sm font-medium uppercase tracking-wide link-5 hover:bg-transparent hover:text-primary">
            <Link href={item.href}>{item.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
