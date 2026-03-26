"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PlannerInputPanel from "@/components/PlannerInputPanel";
import TaskCard from "@/components/TaskCard";
import Garden from "@/components/Garden/Garden";
import ParticlesBackground from "@/components/ParticlesBackground";
import SettingsModal from "@/components/SettingsModal";
import { useSound } from "@/components/useSound";
import { useApp } from "@/context/AppContext";
import {
  readLocalStorageJSON,
  writeLocalStorageJSON,
  removeLocalStorageKey,
} from "@/lib/storage";
import { getFallbackPlan } from "@/lib/planner";

export default function DashboardPage() {
  const { settings, setSettings, mounted } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  const { playClick, playWin } = useSound(settings);

  useEffect(() => {
    if (!mounted) return;
    const savedPlan = readLocalStorageJSON<any>("pfg_plan_v2");
    if (savedPlan) {
      setPlan(savedPlan);
      setPrompt(savedPlan.prompt || "");
    }
  }, [mounted]);

  const tasks =
    plan?.sections?.flatMap((s: any) =>
      s.tasks.map((t: any) => ({ ...t, timeOfDay: s.timeOfDay })),
    ) || [];
  const completedCount = tasks.filter((t: any) => t.completed).length;
  const completedAll = tasks.length > 0 && completedCount === tasks.length;

  useEffect(() => {
    if (completedAll && tasks.length > 0) playWin();
  }, [completedAll]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsPlanning(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const newPlan = {
        ...data.plan,
        prompt,
        sections: data.plan.sections.map((s: any) => ({
          ...s,
          tasks: s.tasks.map((tText: string, idx: number) => ({
            id: `${s.timeOfDay}-${idx}`,
            text: tText,
            completed: false,
          })),
        })),
      };
      setPlan(newPlan);
      writeLocalStorageJSON("pfg_plan_v2", newPlan);
    } catch (e) {
      const fallback = getFallbackPlan(prompt);
      setPlan(fallback);
    } finally {
      setIsPlanning(false);
    }
  };

  const onToggleTask = (id: string) => {
    const nextPlan = {
      ...plan,
      sections: plan.sections.map((s: any) => ({
        ...s,
        tasks: s.tasks.map((t: any) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      })),
    };
    setPlan(nextPlan);
    writeLocalStorageJSON("pfg_plan_v2", nextPlan);
    playClick();
  };

  const resetDay = () => {
    if (confirm("Reset your garden and plan?")) {
      removeLocalStorageKey("pfg_plan_v2");
      setPlan(null);
      setPrompt("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen transition-colors duration-500 bg-app-background">
      <ParticlesBackground />
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="relative z-10 mx-auto max-w-7xl px-8 py-4 grid lg:grid-cols-[1fr_1.2fr] gap-10 animate-bloom">
        <div className="flex flex-col gap-8">
          <PlannerInputPanel
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            onRegenerate={handleGenerate}
            onResetDay={resetDay}
            isPlanning={isPlanning}
          />
          <div className="grid gap-3">
            {tasks.map((t: any) => (
              <TaskCard key={t.id} {...t} onToggle={() => onToggleTask(t.id)} />
            ))}
            {tasks.length === 0 && !isPlanning && (
              <div className="text-center py-20 opacity-40">
                <p className="text-lg font-medium dark:text-slate-400">
                  Your tasks will appear here...
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 h-full">
          <Garden completedCount={completedCount} completedAll={completedAll} />

          <div className="glass-panel rounded-4xl p-6 space-y-4">
            <h5 className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">
              Ambient Scapes
            </h5>
            <div className="flex flex-wrap gap-2">
              {(["none", "birds", "rain"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() =>
                    setSettings((s: any) => ({ ...s, ambientMode: mode }))
                  }
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    settings.ambientMode === mode
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-white/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700"
                  }`}
                >
                  {mode === "none"
                    ? "Silence"
                    : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
        onResetDay={resetDay}
      />
    </div>
  );
}
