import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      colors: {
        'main-background-color': '#131415',
        'sidebar-color': '#1e1f20',
        'main-card-color': '#1c1d1e',
        'card-color': "#1c1d1e",
        'card-color-2': '#131415'
      },
    },
  },
  plugins: [nextui()],
};
export default config;
