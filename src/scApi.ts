// src/scApi.ts
const SC_BASE = "https://api-v2.soundcloud.com";

/**
 * Résout une URL publique de track SoundCloud en objet track (avec id + media.transcodings)
 */
export async function resolveTrack(url: string, clientId: string) {
  const res = await fetch(
    `${SC_BASE}/resolve?url=${encodeURIComponent(url)}&client_id=${clientId}`
  );
  if (!res.ok) throw new Error("Resolve failed");
  const data = await res.json();
  if (!data?.id) throw new Error("Not a track or missing id");
  return data;
}

/**
 * À partir d'une URL de transcoding, récupère l'URL finale du flux (MP3/HLS)
 */
export async function getStreamUrlFromTranscoding(
  transcodingUrl: string,
  clientId: string
) {
  const u = new URL(transcodingUrl);
  u.searchParams.set("client_id", clientId);
  const res = await fetch(u.toString());
  if (!res.ok) throw new Error("Transcoding resolve failed");
  const { url } = await res.json();
  return url as string;
}

/**
 * Choisit la meilleure source: d’abord progressive (MP3), sinon HLS.
 */
export async function getBestStreamForCue(trackUrl: string, clientId: string) {
  const track = await resolveTrack(trackUrl, clientId);
  const transcodings = track?.media?.transcodings || [];

  const progressive = transcodings.find(
    (t: any) => t.format?.protocol === "progressive"
  );
  if (progressive) {
    return {
      type: "progressive" as const,
      url: await getStreamUrlFromTranscoding(progressive.url, clientId),
    };
  }

  const hls = transcodings.find((t: any) => t.format?.protocol === "hls");
  if (hls) {
    return {
      type: "hls" as const,
      url: await getStreamUrlFromTranscoding(hls.url, clientId),
    };
  }

  throw new Error("No playable transcoding found");
}
