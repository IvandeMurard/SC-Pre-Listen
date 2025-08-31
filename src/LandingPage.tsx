// src/LandingPage.tsx
import { useState } from "react";
import DemoSection from "./DemoSection";

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <header className="px-6 py-12 border-b">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">SoundCloud — Cue Preview <span className="align-super text-lg">🎧</span></h1>
          <p className="text-sm opacity-80">
            Pré-écoutez au <strong>casque</strong> la prochaine piste pendant que la piste en cours continue de jouer dans le
            widget officiel SoundCloud (ducking automatique).
          </p>
          <div className="flex gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-xl bg-black text-white"
              onClick={() => setShowDemo(true)}
            >
              Ouvrir la démo
            </button>
            <a
              className="px-4 py-2 rounded-xl border"
              href="https://github.com/IvandeMurard/SC-Pre-Listen"
              target="_blank" rel="noreferrer"
            >
              Voir le code
            </a>
          </div>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">What</h3>
            <p className="text-sm opacity-80 mt-1">
              Un bouton “🎧” pour pré-écouter une autre piste en parallèle, sans couper la lecture en cours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Why</h3>
            <p className="text-sm opacity-80 mt-1">
              Choisir rapidement le “next track”, faire du tri dans des playlists, matcher l’énergie du moment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">How</h3>
            <p className="text-sm opacity-80 mt-1">
              Lecteur principal : widget SoundCloud (iframe). Pré-écoute : élément &lt;audio&gt; natif routé vers le casque via <code>setSinkId()</code> + ducking.
            </p>
          </div>
        </div>
      </section>

      {showDemo ? <DemoSection /> : (
        <section className="px-6 py-6 border-t">
          <div className="max-w-3xl mx-auto text-sm opacity-70">
            Cliquez sur <strong>“Ouvrir la démo”</strong> pour lancer le player et tester le routage au casque.
          </div>
        </section>
      )}

      <footer className="px-6 py-10 border-t">
        <div className="max-w-3xl mx-auto text-xs opacity-60">
          Fonctionne sur Chrome/Edge desktop (HTTPS requis pour le routage). Safari/iOS : pas de sortie séparée.
        </div>
      </footer>
    </main>
  );
}
