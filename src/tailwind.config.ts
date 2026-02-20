import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        oldstandard: ["Old Standard TT", "serif"],
        offside: ["Offside", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
