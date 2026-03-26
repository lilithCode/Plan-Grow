"use client";
import { X, Moon, Sun, Volume2, VolumeX, Trash2 } from "lucide-react";

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  setSettings,
  onResetDay,
}: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md glass-panel !bg-white dark:!bg-slate-900 rounded-3xl p-8 shadow-2xl animate-bloom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                {settings.theme === "dark" ? (
                  <Moon className="text-amber-500" size={20} />
                ) : (
                  <Sun className="text-amber-500" size={20} />
                )}
              </div>
              <span className="font-semibold dark:text-slate-200">
                Appearance
              </span>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  theme: settings.theme === "dark" ? "light" : "dark",
                })
              }
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold capitalize"
            >
              {settings.theme} Mode
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                {settings.soundEnabled ? (
                  <Volume2 className="text-blue-500" size={20} />
                ) : (
                  <VolumeX className="text-blue-500" size={20} />
                )}
              </div>
              <span className="font-semibold dark:text-slate-200">
                Sound Effects
              </span>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  soundEnabled: !settings.soundEnabled,
                })
              }
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                settings.soundEnabled
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              {settings.soundEnabled ? "On" : "Off"}
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

          <button
            onClick={() => {
              onResetDay();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 border-2 border-red-50 dark:border-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold"
          >
            <Trash2 size={18} />
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
