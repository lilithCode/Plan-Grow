/* src/app/dashboard/page.tsx */
"use client";
import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import PlannerInputPanel from "@/components/PlannerInputPanel";
import TaskCard from "@/components/TaskCard";
import Garden from "@/components/Garden/Garden";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useSound } from "@/components/useSound";
import {
  readLocalStorageJSON,
  writeLocalStorageJSON,
  removeLocalStorageKey,
} from "@/lib/storage";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    ambientMode: "none" as any,
  });
  const [showSettings, setShowSettings] = useState(true); // Default open for UX
  const { playClick, playWin } = useSound(settings);

  const [plan, setPlan] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = readLocalStorageJSON("pfg_plan_v1");
    if (saved) {
      setPlan(saved);
      setPrompt(saved.prompt || "");
    }
  }, []);

  const tasks = plan?.sections?.[0]?.tasks || [];
  const completedCount = tasks.filter((t: any) => t.completed).length;
  const completedAll = tasks.length > 0 && completedCount === tasks.length;

  useEffect(() => {
    if (completedAll && tasks.length > 0) playWin();
  }, [completedAll]);

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
    writeLocalStorageJSON("pfg_plan_v1", nextPlan);
    playClick();
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <Navbar
        soundEnabled={settings.soundEnabled}
        toggleSound={() =>
          setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
        }
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-8 py-4 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 animate-bloom">
        <div className="flex flex-col gap-8">
          <PlannerInputPanel
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={() => {
              /* Logic to generate plan */
            }}
            onResetDay={() => {
              setPlan(null);
              setPrompt("");
              removeLocalStorageKey("pfg_plan_v1");
            }}
            isPlanning={isPlanning}
          />
          <div className="grid gap-3">
            {tasks.map((t: any) => (
              <TaskCard key={t.id} {...t} onToggle={() => onToggleTask(t.id)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Garden
            completedCount={completedCount}
            completedAll={completedAll}
            onMenuClick={() => setShowSettings(true)}
          />

          {showSettings && (
            <div className="glass-panel rounded-4xl p-6 space-y-4 animate-bloom">
              <h5 className="font-bold text-slate-500 text-xs uppercase tracking-widest">
                Ambient Scapes
              </h5>
              <div className="flex gap-2">
                {["none", "birds", "rain"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() =>
                      setSettings((s) => ({ ...s, ambientMode: mode as any }))
                    }
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                      settings.ambientMode === mode
                        ? "bg-sky-400 text-white shadow-lg"
                        : "bg-white/50 text-slate-400 hover:bg-white"
                    }`}
                  >
                    {mode === "none" ? "Silence" : mode.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="glass-panel !bg-emerald-50/50 border-emerald-100/50 rounded-4xl p-6 flex flex-col gap-1">
            <div className="flex items-center gap-3 text-emerald-600 font-bold">
              <div className="bg-emerald-100 p-1.5 rounded-xl">
                <CheckCircle2 size={18} />
              </div>
              Keep going! <Leaf size={16} className="fill-emerald-500/20" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
