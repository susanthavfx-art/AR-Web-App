import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markerLibrary from "./scripts/marker-library.mjs";
export default defineConfig({
  plugins: [react(), markerLibrary()],
  base: process.env.VITE_BASE_PATH || "/",
  server: { host: "0.0.0.0", port: 5173, strictPort: true, allowedHosts: true },
  preview: { host: "0.0.0.0", port: 5173, allowedHosts: true },
  optimizeDeps: {
    include: [
      "react",
      "react-dom/client",
      "lucide-react",
      "three",
      "three/addons/geometries/RoundedBoxGeometry.js",
      "three/addons/controls/OrbitControls.js",
      "three/addons/controls/TransformControls.js",
      "three/addons/renderers/CSS3DRenderer.js",
      "lz-string",
      "qrcode",
      "jspdf",
    ],
  },
  build: { outDir: "site", chunkSizeWarningLimit: 2800 },
});
