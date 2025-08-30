# SoundCloud Pre-Listen 🎧

A small experimental side-project to prototype **DJ-style pre-listening on SoundCloud**:
- Keep a main track playing in the official SoundCloud widget (iframe).
- Preview another track in parallel in your headphones (without interrupting the main track).
- The main player is automatically "ducked" (volume lowered) during the preview.

## ⚙️ Tech stack
- [Vite](https://vitejs.dev/) + React + TypeScript
- [TailwindCSS](https://tailwindcss.com/) for styling
- [hls.js](https://github.com/video-dev/hls.js/) for HLS audio playback
- SoundCloud Widget API + SoundCloud public API (`/resolve`, `media.transcodings`)

## 📂 Structure
- `src/scApi.ts` → utility functions to resolve SoundCloud track URLs and fetch stream URLs.
- `src/DualPlayerOptionA.tsx` → React component handling main player (iframe) + cue preview (`<audio>`).
- `src/App.tsx` → minimal demo page.

## 🚀 Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/IvandeMurard/SC-Pre-Listen.git
   cd SC-Pre-Listen
