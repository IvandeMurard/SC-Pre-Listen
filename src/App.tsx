// src/App.tsx
import Hero from "./Hero";
import { PlayerProvider } from "./PlayerProvider";
import TrackRow from "./TrackRow";

export default function App() {
  const mainOnLoad = "https://soundcloud.com/odesza/line-of-sight";
 // src/App.tsx (extrait)
const tracks = [
  {
    title: "Track A (main)",
    artist: "ODESZA",
    scUrl: "https://soundcloud.com/odesza/line-of-sight",
    // ⬇️ remplace le MP3 mock par la vraie URL SoundCloud pour la pré-écoute
    cueTrackUrl: "https://soundcloud.com/odesza/line-of-sight",
    scClientId: import.meta.env.VITE_SC_CLIENT_ID!,
    cover: "/art/a.jpg",
    durationSec: 208,
  },
  {
    title: "Track B",
    artist: "ODESZA",
    scUrl: "https://soundcloud.com/odesza/loyal",
    cueTrackUrl: "https://soundcloud.com/odesza/loyal",
    scClientId: import.meta.env.VITE_SC_CLIENT_ID!,
    cover: "/art/b.jpg",
    durationSec: 194,
  },
  {
    title: "Track C",
    artist: "ODESZA",
    scUrl: "https://soundcloud.com/odesza/memories-that-you-call",
    cueTrackUrl: "https://soundcloud.com/odesza/memories-that-you-call",
    scClientId: import.meta.env.VITE_SC_CLIENT_ID!,
    cover: "/art/c.jpg",
    durationSec: 215,
  },
];

  return (
    <main className="min-h-screen bg-white text-[#e5e5e5] pb-[170px]">
      <Hero />

      <PlayerProvider initialMainUrl={mainOnLoad} stickyBottom>
        {/* POC plus compact */}
        <section className="px-4 sm:px-6 py-8 bg-white text-[#333]">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border shadow-sm p-4 sm:p-5 bg-white">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Live demo</h2>
                <p className="text-xs opacity-70">
                  Click <strong>Play</strong> to load a track. Click <strong>🎧</strong> to preview in headphones —
                  the main player is ducked automatically.
                </p>
              </div>
              <div className="grid gap-2.5">
                {tracks.map((t, i) => <TrackRow key={i} {...(t as any)} />)}
              </div>
              <div className="text-[11px] opacity-70 text-center max-w-2xl mx-auto mt-4">
                <h3 className="font-semibold text-xs mb-1.5">Known limitations</h3>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Audio routing works on Chrome/Edge desktop only (HTTPS required online).</li>
                  <li>Safari / iOS do not support <code>setSinkId</code> → no separate cue output.</li>
                  <li>Uses the public SoundCloud widget; experimental, not affiliated.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </PlayerProvider>

      <footer className="px-6 py-10 border-t bg-[#100808] text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 text-sm">
          <div className="opacity-80">© {new Date().getFullYear()} SoundCloud Cue Preview — experimental.</div>
          <div className="flex gap-4">
            <a className="underline opacity-90 hover:opacity-100" href="https://ivandemurard.com" target="_blank" rel="noreferrer">Website</a>
            <a className="underline opacity-90 hover:opacity-100" href="https://github.com/IvandeMurard/SC-Pre-Listen" target="_blank" rel="noreferrer">GitHub</a>
            <a className="underline opacity-90 hover:opacity-100" href="mailto:hello@ivandemurard.com">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
