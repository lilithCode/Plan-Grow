"use client";
import Link from "next/link";
import { Sparkles, Zap, Leaf, Volume2 } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-20 px-4">
      <div className="inline-flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-white/80 shadow-sm text-sm text-emerald-600 font-bold">
        <Sparkles size={16} /> AI-Powered Mindfulness
      </div>

      <h1 className="text-6xl font-bold text-slate-800 leading-tight max-w-3xl">
        Plan your day. <br /> Watch your{" "}
        <span className="text-emerald-500">focus grow.</span>
      </h1>

      <p className="text-slate-500 text-lg max-w-2xl">
        Turn your to-do list into a living garden. Describe your day to our AI,
        complete your tasks, and watch your digital meadow flourish with every
        step you take.
      </p>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="h-14 px-10 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 text-white font-bold text-lg shadow-lg shadow-emerald-200/40 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Zap size={20} /> Generate my plan
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-16">
        {[
          {
            icon: <Leaf />,
            title: "Visual Growth",
            desc: "One task = One plant",
          },
          {
            icon: <Volume2 />,
            title: "Calm Sounds",
            desc: "Procedural nature audio",
          },
          {
            icon: <Sparkles />,
            title: "AI Guided",
            desc: "Short, human tasks",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-panel p-6 rounded-3xl flex flex-col items-center gap-3 w-48"
          >
            <div className="text-emerald-500">{item.icon}</div>
            <h6 className="font-bold text-slate-700">{item.title}</h6>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
