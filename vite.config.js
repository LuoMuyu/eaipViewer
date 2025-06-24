import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from "unplugin-vue-components/resolvers";
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    vueDevTools(),
    vueI18n({
      include: [path.resolve(__dirname, './src/locales/*.json')]
    }),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  }
})
