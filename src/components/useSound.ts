"use client";
import { useEffect, useRef } from "react";

type AmbientMode = "none" | "birds" | "rain";

export function useSound(settings: {
  soundEnabled: boolean;
  ambientMode: AmbientMode;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientSourceRef = useRef<
    AudioBufferSourceNode | OscillatorNode | null
  >(null);
  const birdsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    return ctxRef.current;
  };

  const stopAmbient = () => {
    if (ambientSourceRef.current) {
      try {
        ambientSourceRef.current.stop();
      } catch (e) {}
      ambientSourceRef.current = null;
    }
    if (birdsIntervalRef.current) {
      clearInterval(birdsIntervalRef.current);
      birdsIntervalRef.current = null;
    }
  };

  const playClick = () => {
    if (!settings.soundEnabled) return;
    const ctx = getCtx();
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
    const now = ctx.currentTime;
    [523, 659, 783, 1046].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.setValueAtTime(f, now + i * 0.1);
      g.gain.setValueAtTime(0, now + i * 0.1);
      g.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
      g.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.4);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(now + 1);
    });
  };

  const startRain = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    const g = ctx.createGain();
    g.gain.value = 0.015;
    source.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    source.start();
    ambientSourceRef.current = source;
  };

  const startBirds = (ctx: AudioContext) => {
    const playChirp = () => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2000 + Math.random() * 3000, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.03, now + 0.02);
      g.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.1);
    };

    birdsIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.6) playChirp();
    }, 600);
  };

  useEffect(() => {
    stopAmbient();
    if (settings.soundEnabled && settings.ambientMode !== "none") {
      const ctx = getCtx();
      if (settings.ambientMode === "rain") startRain(ctx);
      if (settings.ambientMode === "birds") startBirds(ctx);
    }
    return stopAmbient;
  }, [settings.ambientMode, settings.soundEnabled]);

  return { playClick, playWin };
}
