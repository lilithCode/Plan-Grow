"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SettingsModal from "@/components/SettingsModal";
import { useApp } from "@/context/AppContext";
import { removeLocalStorageKey } from "@/lib/storage";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings, setSettings } = useApp();

  const handleReset = () => {
    removeLocalStorageKey("pfg_plan_v2");
    alert("Progress reset successfully.");
  };

  return (
    <div className="relative min-h-[100dvh] bg-app-background transition-colors duration-500">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <HeroSection />

        <div className="mt-10 pb-12">
          <div className="app-reveal text-center rounded-[2.5rem] glass-panel p-8 shadow-xl sm:p-10">
            <div className="text-xl font-bold text-slate-800 dark:text-white">
              Plan your day. Grow your focus.
            </div>
            <div className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Click a task when you’re done. Each completion grows your garden.
              This simple stimulation will help you focus more. Give it a try
              and watch your digital sanctuary flourish.
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        onResetDay={handleReset}
      />
    </div>
  );
}
