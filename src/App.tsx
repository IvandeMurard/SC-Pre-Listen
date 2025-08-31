import { useState } from "react";
import DualPlayerOptionA from "./DualPlayerOptionA";

// src/App.tsx
import LandingPage from "./LandingPage";
export default function App() { return <LandingPage />; }

export default function App() {
  // Choix de la piste à pré-écouter (mock)
  const [cueUrl, setCueUrl] = useState<string | undefined>("/mock/cue-a.mp3");

  // Remplace par une vraie URL SoundCloud publique (ex: https://soundcloud.com/artist/track)
  const MAIN_SC_URL = "https://soundcloud.com/artist-a/track-a";

  return (
    <main className="min-h-screen text-[#333]">
      <header className="px-6 py-10 border-b bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">
            SoundCloud — Cue Preview <span className="align-super text-sm">🎧</span>
          </h1>
          <p className="text-sm mt-2 opacity-80">
            Pré-écoutez au <strong>casque</strong> une piste candidate pendant que la piste principale joue dans le
            widget SoundCloud (ducking automatique).
          </p>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Player principal + pré-écoute */}
          <DualPlayerOptionA
            mainTrackUrl={MAIN_SC_URL}
            cueDirectUrl={cueUrl}            // ✅ mock MP3 local (routage possible)
            // Quand tu auras le client_id, tu passeras plutôt:
            // cueTrackUrl={"https://soundcloud.com/artist-b/track-b"}
            // scClientId={import.meta.env.VITE_SC_CLIENT_ID}
          />

          {/* Sélecteur rapide de la piste à pré-écouter */}
          <div className="space-y-2">
            <h2 className="font-medium">Choisir la piste à pré-écouter</h2>
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
              Astuce : lance d’abord la piste principale dans le widget, puis appuie sur “🎧 Pré-écouter”.
              Test recommandé sur Chrome/Edge desktop. HTTPS requis en ligne (localhost OK).
            </p>
          </div>

          {/* Liste d’exemples d’URLs SoundCloud pour le main (pas obligatoires) */}
          <div className="space-y-2">
            <h3 className="font-medium">Exemples d’URLs SoundCloud (main)</h3>
            <ul className="list-disc ml-6 text-sm opacity-80">
              <li>https://soundcloud.com/artist-a/track-a</li>
              <li>https://soundcloud.com/artist-b/track-b</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
