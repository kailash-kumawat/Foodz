import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Foodz",
        short_name: "Foodz",
        description: "Food delivery app",
        theme_color: "#FA4A0C",
        background_color: "#ffffff",
        start_url: "/",
        scope: "/",
        display: "standalone",
        icons: [
          {
            src: "/images.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
});
