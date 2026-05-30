import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/ra2581392423005/",
	plugins: [react()],
	build: {
		outDir: "docs",
		emptyOutDir: true,
	},
});
