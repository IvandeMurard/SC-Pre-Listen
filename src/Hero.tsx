// src/Hero.tsx
export default function Hero() {
  // Tu peux garder l’URL distante ou héberger l’image en /public/art/club-bg.jpg
  const IMG =
    "https://images.squarespace-cdn.com/content/v1/6470a72d90347b3e50715030/406cd64b-41f4-4743-b162-bd5fdf4d4c54/giant+steps+balloons.jpg";

  return (
    <header className="relative h-[58vh] min-h-[420px] w-full overflow-hidden text-white">
      {/* BG image + Ken Burns (zoom très lent) */}
      <img
        src={IMG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        // focal point proche du coin haut-droit comme sur l’exemple
        style={{ objectPosition: "99.6% 40.8%" }}
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlay sombre + dégradé vertical pour la lisibilité */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/70" />

      {/* Vignette douce sur les bords (radial-gradient) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.55)_100%)]" />

      {/* Film grain (canvas simulé en pur CSS via feTurbulence, light & animé) */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[.18] animate-grain will-change-transform">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
        <div className="space-y-5">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_24px_#ff7a00]">
            SoundCloud — Cue Preview <span className="align-super text-xl">🎧</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-white/90">
            Preview the <em>next</em> track in your headphones while the current one keeps playing in the official
            SoundCloud player. DJ-style cueing for faster curation and smoother transitions.
          </p>
          <p className="mx-auto max-w-2xl text-[11px] text-white/80">
            <strong>Tech:</strong> React + Vite + TypeScript, TailwindCSS, SoundCloud Widget API, Web Audio (
            <code>setSinkId</code>), HLS via <code>hls.js</code>. Built as an experimental side-project.
          </p>
        </div>
      </div>
    </header>
  );
}
