// src/DemoSection.tsx
import { useState } from "react";
import DualPlayerOptionA from "./DualPlayerOptionA";

export default function DemoSection() {
  // Remplace par une vraie URL SoundCloud publique
  const MAIN_SC_URL = "https://soundcloud.com/artist-a/track-a";

  // Deux MP3 mock libres (à placer dans /public/mock/)
  const [cueUrl, setCueUrl] = useState<string>("/mock/cue-a.mp3");

  return (
    <section className="px-6 py-10 bg-white border-t">
      <div className="max-w-3xl mx-auto space-y-8">
        <DualPlayerOptionA
          mainTrackUrl={MAIN_SC_URL}
          cueDirectUrl={cueUrl} // mock local pour la pré-écoute
          // Quand tu auras le client_id :
          // cueTrackUrl={"https://soundcloud.com/artist-b/track-b"}
          // scClientId={import.meta.env.VITE_SC_CLIENT_ID}
        />

        <div className="space-y-2">
          <h2 className="font-medium">Choisir la piste à pré-écouter (mock)</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              className={`px-3 py-2 rounded border ${cueUrl === "/mock/cue-a.mp3" ? "bg-black text-white" : ""}`}
              onClick={() => setCueUrl("/mock/cue-a.mp3")}
            >
              🎧 Cue A (mock)
            </button>
            <button
              className={`px-3 py-2 rounded border ${cueUrl === "/mock/cue-b.mp3" ? "bg-black text-white" : ""}`}
              onClick={() => setCueUrl("/mock/cue-b.mp3")}
            >
              🎧 Cue B (mock)
            </button>
          </div>
          <p className="text-xs opacity-60">
            Lance d’abord la piste principale dans le widget, puis clique “🎧 Pré-écouter”.
            Test recommandé sur Chrome/Edge desktop. En ligne, HTTPS requis.
          </p>
        </div>
      </div>
    </section>
  );
}
