// src/TrackRow.tsx
import { usePlayer } from "./PlayerProvider";

type Base = { title: string; artist?: string; scUrl: string; cover?: string; durationSec?: number };
type Props =
  | (Base & { cueDirectUrl: string; cueTrackUrl?: undefined; scClientId?: undefined })
  | (Base & { cueTrackUrl: string; scClientId: string; cueDirectUrl?: undefined });

function formatTime(sec?: number) {
  if (!sec && sec !== 0) return "–:–";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TrackRow(props: Props) {
  const player = usePlayer();
  const onPlay = () => player.loadAndPlay(props.scUrl);

  const onCue = async () => {
    if ("cueDirectUrl" in props && props.cueDirectUrl) {
      await player.preview({ kind: "direct", url: props.cueDirectUrl });
    } else {
      await player.preview({ kind: "sc", trackUrl: (props as any).cueTrackUrl, clientId: (props as any).scClientId });
    }
  };

  return (
    <div className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg border hover:bg-gray-50 transition">
      {/* Play button à gauche (rond noir) */}
      <button
        onClick={onPlay}
        className="shrink-0 w-9 h-9 rounded-full bg-black text-white grid place-items-center hover:scale-105 transition"
        title="Lire dans le player"
        aria-label="Play"
      >
        ▶
      </button>

      {/* Cover */}
      <img
        src={props.cover || "/art/placeholder.jpg"}
        alt=""
        className="shrink-0 w-12 h-12 rounded object-cover bg-gray-200"
      />

      {/* Titre + artiste + waveform 'fake' */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate font-medium">{props.title}</div>
          {props.artist && <div className="truncate text-xs opacity-60">— {props.artist}</div>}
        </div>

        {/* Waveform 'fake' */}
        <div className="mt-1 h-3 flex gap-0.5 opacity-80">
          {/* 40 barres fines de hauteur variable pour simuler la waveform */}
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 3 + ((i * 73) % 12); // pseudo-aléatoire stable
            return <div key={i} style={{ height: h }} className="w-1 bg-gray-300 rounded-sm" />;
          })}
        </div>
      </div>

      {/* Durée */}
      <div className="text-xs tabular-nums text-gray-500">{formatTime(props.durationSec)}</div>

      {/* Bouton 🎧 à droite (discret) */}
      <button
        onClick={onCue}
        className="shrink-0 px-3 py-2 rounded border hover:bg-white transition"
        title="Pré-écouter au casque"
        aria-label="Pré-écouter"
      >
        🎧
      </button>
    </div>
  );
}
