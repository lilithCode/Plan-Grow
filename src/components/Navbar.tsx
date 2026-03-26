"use client";
import { Settings, Sprout, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Navbar({ onOpenSettings }: any) {
  const { settings, toggleTheme, mounted } = useApp();

  if (!mounted) return <nav className="h-20" />;

  return (
    <nav className="relative z-20 w-full px-8 py-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2.5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform border border-emerald-500/20">
          <Sprout className="text-emerald-500" size={28} />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-50 tracking-tight leading-none">
            Plan & Grow
          </h1>
          <p className="text-[10px] font-bold text-emerald-600/80 dark:text-emerald-400 uppercase tracking-[0.2em] mt-1">
            Focus Bliss
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-3 glass-panel p-2 rounded-2xl dark:border-white/10">
        <Link
          href="/dashboard"
          className="px-5 py-2.5 text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-all shadow-md"
        >
          Open app
        </Link>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          {settings.theme === "dark" ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-indigo-600" />
          )}
        </button>
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
}
