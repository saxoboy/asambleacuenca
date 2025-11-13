import { Button } from "@/components/ui/button";
import { LogoMain } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { NavigationSheet } from "./navigation-sheet";
import { NavMenu } from "./nav-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-2xl) mx-auto px-4">
        <LogoMain />
        {/* Desktop Menu */}
        <NavMenu className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button className="inline-flex">Nuevo aqui?</Button>
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;