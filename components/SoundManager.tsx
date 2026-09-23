"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function SoundManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    gainNode: GainNode;
    oscillators: OscillatorNode[];
    noiseNode: AudioBufferSourceNode | null;
  } | null>(null);

  // Stop procedural synthesis smoothly
  const stopProceduralAmbient = useCallback(() => {
    if (synthNodesRef.current && audioCtxRef.current) {
      const { gainNode, oscillators, noiseNode } = synthNodesRef.current;
      const now = audioCtxRef.current.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 1.2);

      setTimeout(() => {
        try {
          oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          if (noiseNode) {
            try {
              noiseNode.stop();
              noiseNode.disconnect();
            } catch {
              // ignore
            }
          }
        } catch {
          // ignore
        }
        synthNodesRef.current = null;
      }, 1300);
    }
  }, []);

  // Web Audio procedural soothing nocturnal ambient drone (gentle pad + soft rain murmur)
  const startProceduralAmbient = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume * 0.35, ctx.currentTime + 2.0);
      masterGain.connect(ctx.destination);

      // Lowpass filter for warm, night-time velvet texture
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filter.connect(masterGain);

      // Warm harmonic chords: C3 (130.81Hz), G3 (196.00Hz), D#4 (311.13Hz)
      const freqs = [130.81, 196.0, 311.13, 261.63];
      const oscillators: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);

        // Gentle LFO slow breathing modulation
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.1 + idx * 0.04, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscillators.push(osc);
      });

      // Very soft pink-noise rain murmur in the background
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.153852;
        output[i] = (b0 + b1 + b2) * 0.03;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      synthNodesRef.current = {
        gainNode: masterGain,
        oscillators,
        noiseNode: noiseSource
      };
    } catch (e) {
      console.warn("Ambient audio synthesis initialized with fallback", e);
    }
  }, [volume]);

  const toggleSound = () => {
    if (isPlaying) {
      // Turn off
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopProceduralAmbient();
      setIsPlaying(false);
    } else {
      // Turn on: try mp3 file first, else procedural synth
      const audio = audioRef.current;
      if (audio && audio.src && !audio.src.endsWith("#")) {
        audio.volume = volume;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Audio file not found or browser blocked, fallback to Web Audio procedural
            startProceduralAmbient();
            setIsPlaying(true);
          });
      } else {
        startProceduralAmbient();
        setIsPlaying(true);
      }
    }
  };

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (synthNodesRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      synthNodesRef.current.gainNode.gain.cancelScheduledValues(now);
      synthNodesRef.current.gainNode.gain.linearRampToValueAtTime(volume * 0.35, now + 0.1);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopProceduralAmbient();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, [stopProceduralAmbient]);

  return (
    <div className="flex items-center gap-2">
      {/* Hidden fallback audio tag */}
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />

      <button
        onClick={toggleSound}
        className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
          isPlaying
            ? "bg-amber-500/10 text-amber-200 border-amber-500/40 shadow-[0_0_12px_rgba(197,160,89,0.2)]"
            : "bg-white/[0.03] text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/20"
        }`}
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
        title="Ambient background sound (soft nocturnal drone)"
      >
        <span className="flex items-center gap-1.5">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-amber-400" : "text-zinc-400"}`} />
          <span>♪ Ambient</span>
        </span>

        {/* Animated sound wave bars when active */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3 ml-1" aria-hidden="true">
            <span className="w-[2px] h-2 bg-amber-400 animate-pulse rounded-full" />
            <span className="w-[2px] h-3 bg-amber-300 animate-pulse delay-75 rounded-full" />
            <span className="w-[2px] h-1.5 bg-amber-400 animate-pulse delay-150 rounded-full" />
          </div>
        ) : (
          <VolumeX className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400" />
        )}
      </button>

      {/* Subtle Volume slider when playing */}
      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400 hidden sm:block"
          aria-label="Ambient volume"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />
      )}
    </div>
  );
}

