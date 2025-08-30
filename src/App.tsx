// src/App.tsx
import DualPlayerOptionA from "./DualPlayerOptionA";

const tracks = [
  { title: "Main — Track A", url: "https://soundcloud.com/artist-a/track-a" },
  { title: "Cue — Track B",  url: "https://soundcloud.com/artist-b/track-b" },
  { title: "Cue — Track C",  url: "https://soundcloud.com/artist-c/track-c" },
];

export default function App() {
  const clientId = import.meta.env.VITE_SC_CLIENT_ID!;
  return (
    <main className="min-h-screen bg-white text-[#333]">
      <header className="px-6 py-10 border-b">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">SoundCloud — Cue Preview 🎧</h1>
          <p className="text-sm mt-2 opacity-80">
            Pré-écoutez une piste au casque sans couper la piste en cours (DJ-style).
          </p>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-10">
          <DualPlayerOptionA
            mainTrackUrl={tracks[0].url}
            cueTrackUrl={tracks[1].url}
            scClientId={clientId}
          />

          <div className="grid gap-4">
            <h3 className="font-medium">Autres pistes à tester</h3>
            <ul className="list-disc ml-6 text-sm">
              {tracks.slice(1).map(t => (
                <li key={t.url} className="opacity-80">{t.title} — {t.url}</li>
              ))}
            </ul>
            <p className="text-xs opacity-60">
              Note : routage audio supporté surtout Chrome/Edge desktop (HTTPS requis). Safari/iOS : pas de routage séparé.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
