import { svelte } from "@sveltejs/vite-plugin-svelte";
import icons from "unplugin-icons/vite";
import { defineConfig, loadEnv } from "vite";
import wasm from "vite-plugin-wasm";

import { tsJsonSchemaPlugin } from "./scripts/vite-plugin-ts-json-schema.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from project root
  const env = loadEnv(mode, '../../', '');

  return {
    base: "",
    plugins: [svelte(), wasm(), icons({ compiler: "svelte" }), tsJsonSchemaPlugin()],
    worker: {
      format: "es",
      plugins: () => [wasm()],
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 4096,
    },
    server: {
      proxy: {
        '/api/openrouter': {
          target: 'https://openrouter.ai/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/openrouter/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Add API key from environment
              const apiKey = env.VITE_OPENROUTER_API_KEY;
              console.log('[Proxy] Adding Authorization header, API key present:', !!apiKey);
              if (apiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
              }
            });
          }
        }
      }
    }
  };
});
