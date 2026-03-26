"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { readLocalStorageJSON, writeLocalStorageJSON } from "@/lib/storage";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    ambientMode: "none",
    theme: "light",
  });

  useEffect(() => {
    const saved = readLocalStorageJSON("pfg_settings");
    if (saved) setSettings(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeLocalStorageJSON("pfg_settings", settings);
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings, mounted]);

  const toggleTheme = () =>
    setSettings((s) => ({
      ...s,
      theme: s.theme === "dark" ? "light" : "dark",
    }));

  return (
    <AppContext.Provider
      value={{ settings, setSettings, toggleTheme, mounted }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
