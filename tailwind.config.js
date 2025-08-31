/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

@keyframes kenburns {
  0%   { transform: scale(1.04) translate3d(0,0,0); }
  100% { transform: scale(1.11) translate3d(0,0,0); }
}
.animate-kenburns {
  animation: kenburns 22s ease-in-out forwards;
  transform-origin: 80% 40%; /* léger biais vers le coin focal */
  will-change: transform;
}

/* Grain subtile: léger drift pour “vivre” comme sur Squarespace */
@keyframes grainShift {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-2%, -2%, 0); }
}
.animate-grain {
  animation: grainShift 1.6s steps(2, end) infinite;
}
