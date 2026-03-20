/* src/components/Navbar.tsx */
"use client";
import { Volume2, Settings, Sprout, VolumeX } from "lucide-react";
import Link from "next/link";

export default function Navbar({
  soundEnabled,
  toggleSound,
  onSettingsClick,
}: any) {
  return (
    <nav className="relative z-20 w-full px-8 py-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-emerald-100/60 p-2.5 rounded-full shadow-inner group-hover:bg-emerald-200/60 transition-colors">
          <Sprout className="text-emerald-500" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-700 tracking-tight leading-none">
            Plan & Grow
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Focus, but make it calm.
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-2 bg-white/40 p-1.5 rounded-full border border-white/60 shadow-sm backdrop-blur-md">
        <Link
          href="/dashboard"
          className="px-6 py-2 text-[13px] font-bold text-slate-600 hover:bg-white/60 rounded-full transition-all"
        >
          Open app
        </Link>
        <div className="w-px h-4 bg-slate-200/60 mx-1" />
        <button
          onClick={toggleSound}
          className="p-2 text-slate-400 hover:text-slate-600 transition-all"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 text-slate-400 hover:text-slate-600 transition-all hover:rotate-45"
        >
          <Settings size={18} />
        </button>
      </div>
    </nav>
  );
}
