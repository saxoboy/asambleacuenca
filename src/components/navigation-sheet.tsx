"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoMain } from "./logo";
import { NavMenu } from "./nav-menu";
import { ModeToggle } from "./mode-toggle";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mx-auto my-8"><LogoMain /></div>
        <NavMenu orientation="vertical" className="mt-4 items-start w-full pl-4" />
        <div className="my-8 flex flex-col items-center gap-4">
          <ModeToggle />
          <Button className="xs:hidden">Nuevo aqui?</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};