/* src/components/useSound.ts */
"use client";
import { useEffect, useRef } from "react";

type AmbientMode = "none" | "birds" | "rain";

export function useSound(settings: {
  soundEnabled: boolean;
  ambientMode: AmbientMode;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<any[]>([]);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AudioContextClass =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) ctxRef.current = new AudioContextClass();
    }
    return ctxRef.current;
  };

  const playClick = () => {
    if (!settings.soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const playWin = () => {
    if (!settings.soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.setValueAtTime(f, now + i * 0.1);
      g.gain.setValueAtTime(0, now + i * 0.1);
      g.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      g.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.4);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.5);
    });
  };

  const stopAmbient = () => {
    if (ambientNodesRef.current.length > 0) {
      ambientNodesRef.current.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch (e) {
          // Silently catch if already stopped or never started
        }
      });
      ambientNodesRef.current = [];
    }
  };

  const startAmbient = (type: AmbientMode) => {
    stopAmbient();
    if (type === "none" || !settings.soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    if (type === "birds") {
      // Procedural chirps (simulated with random sines)
      const playChirp = () => {
        if (settings.ambientMode !== "birds") return;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(
          1500 + Math.random() * 1000,
          ctx.currentTime,
        );
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.05);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        setTimeout(playChirp, 2000 + Math.random() * 3000);
      };
      playChirp();
    } else if (type === "rain") {
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;

      const g = ctx.createGain();
      g.gain.value = 0.015;

      whiteNoise.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);

      whiteNoise.start();
      ambientNodesRef.current.push(whiteNoise);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      startAmbient(settings.ambientMode);
    }
    return stopAmbient;
  }, [settings.ambientMode, settings.soundEnabled]);

  return { playClick, playWin };
}
