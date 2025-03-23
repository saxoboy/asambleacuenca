import { AutoSliderBanner } from "@/components/auto-slider-banner";
import { SplashScreen } from "@/components/splash-screen";


export default function Home() {
  return (
    <>
      <SplashScreen />      
      <main className="flex min-h-screen flex-col items-center justify-between">
        <AutoSliderBanner />
      </main>
    </>
  );
}
