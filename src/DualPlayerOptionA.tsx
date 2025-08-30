// ...imports inchangés
type StreamInfo = { type: "progressive" | "hls"; url: string };

type Props = {
  mainTrackUrl: string;
  cueTrackUrl?: string;     // deviens optionnel
  cueDirectUrl?: string;    // NEW: URL directe (ex: /mock/cue.mp3)
  scClientId?: string;      // optionnel si mock
};

export default function DualPlayerOptionA({
  mainTrackUrl,
  cueTrackUrl,
  cueDirectUrl,
  scClientId,
}: Props) {
  // ...refs & states inchangés

  // ▼▼▼ remplace CE useEffect par celui-ci ▼▼▼
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        // 1) MOCK direct: si cueDirectUrl est fourni, on l’utilise
        if (cueDirectUrl) {
          if (!cancel) setCueStream({ type: "progressive", url: cueDirectUrl });
          return;
        }

        // 2) Sinon, on passe par l’API SoundCloud si les infos existent
        if (cueTrackUrl && scClientId) {
          const info = await getBestStreamForCue(cueTrackUrl, scClientId);
          if (!cancel) setCueStream(info);
          return;
        }

        console.warn("Aucune source de pré-écoute fournie (cueDirectUrl ou cueTrackUrl+clientId).");
      } catch (e) {
        console.error("Cue stream error:", e);
      }
    })();
    return () => { cancel = true; };
  }, [cueDirectUrl, cueTrackUrl, scClientId]);
  // ▲▲▲ fin remplacement ▲▲▲

  // ...le reste du composant ne change pas
}
