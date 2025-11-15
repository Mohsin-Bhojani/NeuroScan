import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env, .env.local, etc.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [react()],

    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.ROBOFLOW_API_KEY": JSON.stringify(env.ROBOFLOW_API_KEY),
      "process.env.ROBOFLOW_MODEL": JSON.stringify(env.ROBOFLOW_MODEL),
      "process.env.ROBOFLOW_VERSION": JSON.stringify(env.ROBOFLOW_VERSION),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };
});
