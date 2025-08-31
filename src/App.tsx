// src/App.tsx
import { PlayerProvider } from "./PlayerProvider";
import TrackRow from "./TrackRow";

export default function App() {
  const mainOnLoad = "https://soundcloud.com/odesza/line-of-sight"; // exemple public

  const tracks = [
    {
      title: "Track A (main)",
      artist: "Artist A",
      scUrl: "https://soundcloud.com/artist-a/track-a",
      cueDirectUrl: "/mock/cue-a.mp3",
      cover: "/art/a.jpg",
      durationSec: 208,
    },
    {
      title: "Track B",
      artist: "Artist B",
      scUrl: "https://soundcloud.com/artist-b/track-b",
      cueDirectUrl: "/mock/cue-b.mp3",
      cover: "/art/b.jpg",
      durationSec: 194,
    },
    {
      title: "Track C",
      artist: "Artist C",
      scUrl: "https://soundcloud.com/artist-c/track-c",
      cueDirectUrl: "/mock/cue-c.mp3",
      cover: "/art/c.jpg",
      durationSec: 215,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#333] pb-[160px]">
      <header className="px-6 py-10 border-b">
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Playlist — Play & Cue (style SoundCloud)</h1>
          <p className="text-sm opacity-80">
            Play ⟶ lecture normale dans le player. 🎧 ⟶ pré-écoute au casque (ducking automatique).
          </p>
        </div>
      </header>

      <PlayerProvider initialMainUrl={mainOnLoad} stickyBottom>
        <section className="px-6 py-8">
          <div className="max-w-4xl mx-auto grid gap-3">
            {tracks.map((t, i) => (
              <TrackRow key={i} {...(t as any)} />
            ))}
          </div>
          <p className="max-w-4xl mx-auto mt-4 text-xs opacity-60">
            Chrome/Edge desktop recommandé. HTTPS requis en ligne pour le routage. Safari/iOS : pas de sortie séparée.
          </p>
        </section>
      </PlayerProvider>
    </main>
  );
}
