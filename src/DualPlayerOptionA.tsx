// src/DualPlayerOptionA.tsx
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { getBestStreamForCue } from "./scApi";

declare global {
  interface Window { SC: any }
  interface HTMLMediaElement { setSinkId?(sinkId: string): Promise<void> }
}

type StreamInfo = { type: "progressive" | "hls"; url: string };

type Props = {
  mainTrackUrl: string;   // URL publique SoundCloud pour le widget (piste A)
  cueTrackUrl: string;    // URL publique SoundCloud pour pré-écoute (piste B)
  scClientId: string;     // VITE_SC_CLIENT_ID
};

export default function DualPlayerOptionA({
  mainTrackUrl,
  cueTrackUrl,
  scClientId,
}: Props) {
  const mainIframeRef = useRef<HTMLIFrameElement | null>(null);
  const mainWidgetRef = useRef<any>(null);

  const cueAudioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [cueStream, setCueStream] = useState<StreamInfo | null>(null);
  const [isCueing, setIsCueing] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [sinkId, setSinkId] = useState<string>("");

  // Initialiser l'API du widget pour gérer le volume (ducking)
  useEffect(() => {
    if (mainIframeRef.current && window.SC?.Widget) {
      mainWidgetRef.current = window.SC.Widget(mainIframeRef.current);
    }
  }, []);

  // Préparer le flux de pré-écoute (résolution + choix MP3/HLS)
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const info = await getBestStreamForCue(cueTrackUrl, scClientId);
        if (!cancel) setCueStream(info);
      } catch (e) {
        console.error("Cue stream error:", e);
      }
    })();
    return () => { cancel = true; };
  }, [cueTrackUrl, scClientId]);

  // Attacher HLS si nécessaire
  useEffect(() => {
    if (!cueAudioRef.current || !cueStream) return;

    if (cueStream.type === "hls") {
      if (Hls.isSupported()) {
        const h = new Hls();
        h.loadSource(cueStream.url);
        h.attachMedia(cueAudioRef.current);
        hlsRef.current = h;
      } else {
        // Safari lit HLS nativement
        cueAudioRef.current.src = cueStream.url;
      }
    } else {
      cueAudioRef.current.src = cueStream.url; // MP3 progressif
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [cueStream]);

  // Lister les sorties audio (nécessite permission)
  async function fetchOutputDevices() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devs = await navigator.mediaDevices.enumerateDevices();
      setDevices(devs.filter(d => d.kind === "audiooutput"));
    } catch (e) {
      console.warn("Device permission error:", e);
    }
  }

  async function routeCueTo(id: string) {
    if (!cueAudioRef.current?.setSinkId) {
      alert("Routage non supporté sur ce navigateur (Chrome/Edge recommandé).");
      return;
    }
    try {
      await cueAudioRef.current.setSinkId(id);
      setSinkId(id);
    } catch (e) {
      console.error("setSinkId error:", e);
    }
  }

  async function startCue() {
    if (!cueAudioRef.current) return;
    try {
      mainWidgetRef.current?.setVolume?.(60); // duck le main
      await cueAudioRef.current.play();       // doit suivre un clic user
      setIsCueing(true);
      console.log("cue_start");
    } catch (e) { console.error(e); }
  }

  function stopCue() {
    if (!cueAudioRef.current) return;
    cueAudioRef.current.pause();
    setIsCueing(false);
    mainWidgetRef.current?.setVolume?.(100); // remonte le main
    console.log("cue_stop");
  }

  return (
    <div className="space-y-4">
      {/* Player principal (widget officiel) */}
      <iframe
        ref={mainIframeRef}
        title="Main SoundCloud"
        width="100%"
        height="166"
        allow="autoplay"
        scrolling="no"
        frameBorder="no"
        className="rounded-lg w-full"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(mainTrackUrl)}&auto_play=false&show_teaser=false`}
      />

      {/* Contrôles pré-écoute */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={startCue}
          disabled={!cueStream || isCueing}
        >
          🎧 Pré-écouter
        </button>
        <button
          className="px-3 py-2 rounded bg-gray-200"
          onClick={stopCue}
          disabled={!!cueStream && !isCueing ? true : !isCueing}
        >
          Stop
        </button>

        <button className="px-3 py-2 rounded border" onClick={fetchOutputDevices}>
          Choisir un casque…
        </button>
        <select
          className="px-2 py-2 border rounded"
          value={sinkId}
          onChange={(e) => routeCueTo(e.target.value)}
        >
          <option value="">Sortie audio</option>
          {devices.map(d => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || "Périphérique audio"}
            </option>
          ))}
        </select>

        <span className={`text-sm ${isCueing ? "text-green-600" : "text-gray-500"}`}>
          {isCueing ? "Pré-écoute en cours 🔊" : "Prêt à pré-écouter"}
        </span>
      </div>

      {/* Flux natif (pré-écoute) */}
      <audio ref={cueAudioRef} preload="auto" />
    </div>
  );
}
