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

  const onStopCue = () => {
    player.stopPreview();
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3 px-3 rounded-lg border hover:bg-gray-50 transition">
      {/* Left: cover + info */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={props.cover || "/art/placeholder.jpg"}
          alt=""
          className="shrink-0 w-12 h-12 rounded object-cover bg-gray-200"
        />
        <div className="min-w-0">
          <div className="truncate font-medium">{props.title}</div>
          {props.artist && <div className="truncate text-xs opacity-60">{props.artist}</div>}
          {player.isCueing && (
            <div className="text-xs text-amber-600 font-semibold mt-1">🎧 Cueing in headphones…</div>
          )}
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2 shrink-0">
        {player.isCueing ? (
          <button
            onClick={onStopCue}
            className="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700"
            title="Stop cue"
          >
            Stop 🎧
          </button>
        ) : (
          <button
            onClick={onCue}
            className="px-3 py-2 rounded border hover:bg-white transition"
            title="Cue in headphones"
          >
            🎧
          </button>
        )}

        <button
          onClick={onPlay}
          className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
          title="Play in main player"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
