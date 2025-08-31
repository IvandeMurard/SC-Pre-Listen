// src/App.tsx
import { PlayerProvider } from "./PlayerProvider";
import TrackRow from "./TrackRow";

export default function App() {
  // Use real, public SoundCloud URLs to avoid the "invalid URL" banner
  const mainOnLoad = "https://soundcloud.com/odesza/line-of-sight";

  const tracks = [
    {
      title: "Track A (main)",
      artist: "Artist A",
      scUrl: "https://soundcloud.com/odesza/line-of-sight",
      cueDirectUrl: "/mock/cue-a.mp3", // mock preview now; switch to SC cue later
      cover: "/art/a.jpg",
      durationSec: 208,
    },
    {
      title: "Track B",
      artist: "Artist B",
      scUrl: "https://soundcloud.com/odesza/loyal",
      cueDirectUrl: "/mock/cue-b.mp3",
      cover: "/art/b.jpg",
      durationSec: 194,
    },
    {
      title: "Track C",
      artist: "Artist C",
      scUrl: "https://soundcloud.com/odesza/memories-that-you-call",
      cueDirectUrl: "/mock/cue-c.mp3",
      cover: "/art/c.jpg",
      durationSec: 215,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#e5e5e5] pb-[190px]">
      {/* ------------ HERO (dark club vibe) ------------ */}
      <header className="relative px-6 pt-20 pb-16 bg-gradient-to-b from-[#1a0d0d] to-[#2a0000] text-center">
        {/* background image (blurred + dark overlay) */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/art/club-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_#ff6600]">
            SoundCloud — Cue Preview <span className="align-super text-xl">🎧</span>
          </h1>

          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Preview the <em>next</em> track in your headphones while the current one keeps playing in the
            official SoundCloud player. DJ-style cueing for faster curation and smoother transitions.
          </p>

          <div className="text-xs text-white/75 max-w-2xl mx-auto">
            <p>
              <strong>Tech stack:</strong> React + Vite + TypeScript, TailwindCSS, SoundCloud Widget API,
              Web Audio (<code>setSinkId</code>), HLS via <code>hls.js</code>.
            </p>
            <p><strong>Built as a weekend side-project.</strong> Not affiliated with SoundCloud.</p>
          </div>
        </div>
      </header>

      {/* ------------ POC (light section) ------------ */}
      <PlayerProvider initialMainUrl={mainOnLoad} stickyBottom>
        <section className="px-6 py-10 bg-white text-[#333]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-semibold">Live demo</h2>
              <p className="text-sm opacity-70">
                Click <strong>Play</strong> to load a track in the SoundCloud player. Click <strong>🎧</strong> to
                preview a candidate track in your headphones — the main player is automatically ducked.
              </p>
            </div>

            <div className="grid gap-3">
              {tracks.map((t, i) => (
                <TrackRow key={i} {...(t as any)} />
              ))}
            </div>

            {/* Known limitations */}
            <div className="text-xs opacity-70 text-center max-w-xl mx-auto mt-6">
              <h3 className="font-semibold text-sm mb-2">Known limitations</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Audio routing works only on Chrome/Edge desktop (HTTPS required online).</li>
                <li>Safari / iOS do not support <code>setSinkId</code> → no separate cue output.</li>
                <li>Uses the public SoundCloud widget; this project is experimental and not affiliated.</li>
              </ul>
            </div>
          </div>
        </section>
      </PlayerProvider>

      {/* ------------ FOOTER (dark) ------------ */}
      <footer className="px-6 py-10 border-t bg-[#140a0a] text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 text-sm">
          <div className="opacity-80">
            © {new Date().getFullYear()} SoundCloud Cue Preview — experimental, non-commercial.
          </div>
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
