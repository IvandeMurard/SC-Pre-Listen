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

## 1. ⚙️ Tech stack
- [Vite](https://vitejs.dev/) + React + TypeScript
- [TailwindCSS](https://tailwindcss.com/) for styling
- [hls.js](https://github.com/video-dev/hls.js/) for HLS audio playback
- SoundCloud Widget API + SoundCloud public API (`/resolve`, `media.transcodings`)

## 2. 📂 Structure
- `src/scApi.ts` → utility functions to resolve SoundCloud track URLs and fetch stream URLs.
- `src/DualPlayerOptionA.tsx` → React component handling main player (iframe) + cue preview (`<audio>`).
- `src/App.tsx` → minimal demo page.

## 3. 🚀 Setup
1. Cloner le repo :
   ```bash
   git clone https://github.com/IvandeMurard/SC-Pre-Listen.git
   cd SC-Pre-Listen

## Install dependencies:
npm install


## Create a .env file in the root with your SoundCloud client ID:
VITE_SC_CLIENT_ID=YOUR_CLIENT_ID


## Run the dev server:
npm run dev

## Open http://localhost:5173/ in your browser.

⚠️ Notes
Works best on Chrome / Edge desktop. Safari/iOS does not support audio output routing (setSinkId).
HTTPS is required for audio device routing.
Non-commercial, purely experimental project.
Made with ❤️ by Ivan de Murard


