// src/PlayerProvider.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { getBestStreamForCue } from "./scApi";

declare global {
  interface Window { SC: any }
  interface HTMLMediaElement { setSinkId?(sinkId: string): Promise<void> }
}

type StreamInfo = { type: "progressive" | "hls"; url: string };

type CueSource =
  | { kind: "direct"; url: string }                               // MP3 local (mock)
  | { kind: "sc"; trackUrl: string; clientId: string };           // SoundCloud réel

type PlayerAPI = {
  loadAndPlay: (trackUrl: string) => void;                        // charger une piste dans le widget (Play normal)
  setVolume: (v: number) => void;                                 // ducking
  preview: (src: CueSource) => Promise<void>;                     // lancer la pré-écoute 🎧
  stopPreview: () => void;                                        // arrêter la pré-écoute
  isCueing: boolean;
};

const PlayerCtx = createContext<PlayerAPI | null>(null);
export const usePlayer = () => {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
};

const PREFERRED_SINK_KEY = "preferredSinkId";

function looksLikeHeadphones(label: string) {
  return /head(phone|set)|casque|airpods|buds|ear|bose|sony|xm|wh-|quietcomfort|bluetooth|usb/i.test(label);
}
async function ensureOutputDevicesPermission() {
  try { await navigator.mediaDevices.getUserMedia({ audio: true }); } catch {}
}
async function pickBestOutput(devs: MediaDeviceInfo[]) {
  const outs = devs.filter(d => d.kind === "audiooutput");
  const hp = outs.find(d => looksLikeHeadphones(d.label || ""));
  return hp?.deviceId || "default";
}

type Props = {
  /** Piste affichée dans le widget au démarrage */
  initialMainUrl: string;
  /** Place le widget en sticky en bas (UX “lecteur global”) */
  stickyBottom?: boolean;
  children: React.ReactNode;
};

export function PlayerProvider({ initialMainUrl, stickyBottom = true, children }: Props) {
  // --- Widget principal
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<any>(null);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    if (iframeRef.current && window.SC?.Widget) {
      const w = window.SC.Widget(iframeRef.current);
      widgetRef.current = w;
      w.bind(window.SC.Widget.Events.READY, () => setWidgetReady(true));
    }
  }, []);

  useEffect(() => {
    if (!widgetReady || !widgetRef.current) return;
    widgetRef.current.load(initialMainUrl, { auto_play: false, show_teaser: false });
  }, [widgetReady, initialMainUrl]);

  function loadAndPlay(trackUrl: string) {
    widgetRef.current?.load(trackUrl, { auto_play: true, show_teaser: false });
  }
  function setVolume(v: number) {
    widgetRef.current?.setVolume?.(v);
  }

  // --- Cue engine (pré-écoute au casque)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isCueing, setIsCueing] = useState(false);

  async function routeAuto() {
    if (!audioRef.current?.setSinkId) return;
    const saved = localStorage.getItem(PREFERRED_SINK_KEY);
    if (saved) {
      try { await audioRef.current.setSinkId(saved); return; } catch {}
    }
    try {
      await audioRef.current.setSinkId("default");
      localStorage.setItem(PREFERRED_SINK_KEY, "default");
      return;
    } catch { /* continue */ }
    await ensureOutputDevicesPermission();
    const devs = await navigator.mediaDevices.enumerateDevices();
    const best = await pickBestOutput(devs);
    await audioRef.current.setSinkId(best);
    localStorage.setItem(PREFERRED_SINK_KEY, best);
  }

  async function setCueStream(info: StreamInfo) {
    if (!audioRef.current) return;
    // cleanup HLS précédent
    hlsRef.current?.destroy(); hlsRef.current = null;

    if (info.type === "hls") {
      if (Hls.isSupported()) {
        const h = new Hls();
        h.loadSource(info.url);
        h.attachMedia(audioRef.current);
        hlsRef.current = h;
      } else {
        audioRef.current.src = info.url; // Safari HLS natif
      }
    } else {
      audioRef.current.src = info.url;   // MP3 progressif
    }
  }

  async function preview(src: CueSource) {
    if (!audioRef.current) return;
    // route avant lecture (ne déclenche PAS le widget)
    await routeAuto();

    // prépare la source
    if (src.kind === "direct") {
      await setCueStream({ type: "progressive", url: src.url });
    } else {
      const info = await getBestStreamForCue(src.trackUrl, src.clientId);
      await setCueStream(info);
    }

    // duck + play
    setVolume(60);
    await audioRef.current.play();
    setIsCueing(true);
  }

  function stopPreview() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsCueing(false);
    setVolume(100);
  }

  const api: PlayerAPI = { loadAndPlay, setVolume, preview, stopPreview, isCueing };

  return (
    <PlayerCtx.Provider value={api}>
      {/* contenu de page (liste de pistes avec boutons Play/🎧) */}
      {children}

        {/* lecteur principal (unique) */}
      <div className={`${stickyBottom ? "fixed bottom-0 left-0 right-0 z-50" : ""} bg-white border-t shadow-sm`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <iframe
            ref={iframeRef}
            title="SoundCloud Main Player"
            width="100%"
            height="166"
            allow="autoplay"
            scrolling="no"
            frameBorder="no"
            className="rounded-lg w-full bg-white"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(initialMainUrl)}&auto_play=false&show_teaser=false`}
          />
        </div>
      </div>

      {/* audio caché pour la pré-écoute */}
      <audio ref={audioRef} preload="auto" />
    </PlayerCtx.Provider>
  );
}
