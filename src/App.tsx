import DualPlayerOptionA from "./DualPlayerOptionA";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-[#333]">
      <header className="px-6 py-10 border-b">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">SoundCloud — Cue Preview (Mock) 🎧</h1>
          <p className="text-sm mt-2 opacity-80">
            Pré-écoutez un MP3 local au casque pendant qu’un track joue dans le widget.
          </p>
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-10">
          <DualPlayerOptionA
            mainTrackUrl={"https://soundcloud.com/artist-a/track-a"}
            cueDirectUrl={"/mock/cue.mp3"}           // ✅ MOCK MP3 local
            // cueTrackUrl={"https://soundcloud.com/artist-b/track-b"} // (garde pour plus tard)
            // scClientId={import.meta.env.VITE_SC_CLIENT_ID}          // (pour v2)
          />
          <p className="text-xs opacity-60">
            Test recommandé sur Chrome/Edge desktop. HTTPS requis en prod (localhost est ok).
          </p>
        </div>
      </section>
    </main>
  );
}
