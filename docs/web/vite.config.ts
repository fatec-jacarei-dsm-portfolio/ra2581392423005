import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ra2581392423005/",
  build: {
    outDir: "docs", //  👈 Adicione esta seção para mudar a pasta de saída
  }, // Adicionado para o GitHub Pages
});
