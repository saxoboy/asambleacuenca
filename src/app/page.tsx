import { AutoSliderBanner } from "@/components/auto-slider-banner";
import { SplashScreen } from "@/components/splash-screen";
import { Logo } from "@/components/logo";


export default function Home() {
  return (
    <>
      <SplashScreen />
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <Logo />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <AutoSliderBanner />
      </main>
    </>
  );
}
