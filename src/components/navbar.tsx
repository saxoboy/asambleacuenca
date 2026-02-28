import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoMain } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavigationSheet } from "./navigation-sheet";
import { NavMenu } from "./nav-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="h-16 flex items-center justify-between max-w-(--breakpoint-2xl) mx-auto px-4">
        <LogoMain />
        <NavMenu className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button asChild className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white font-semibold">
            <Link href="/web#contactenos">¿Nuevo aquí?</Link>
          </Button>
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
