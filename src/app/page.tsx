import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] bg-app-background">
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <HeroSection />

        <div className="mt-10 pb-12">
          <div className="app-reveal rounded-3xl bg-app-card p-5 shadow-[0_14px_30px_rgba(148,163,184,0.16)] ring-1 ring-app-card-border backdrop-blur sm:p-6">
            <div className="text-base font-semibold text-app-foreground">
              Plan your day. Grow your focus.
            </div>
            <div className="mt-2 text-sm leading-7 text-app-muted">
              Click a task when you’re done. Each completion grows your
              garden—from seed to full garden.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
