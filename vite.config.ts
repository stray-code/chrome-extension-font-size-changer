import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'フォントサイズ変更',
  version: '1.0.0',
  icons: {
    16: 'assets/img/icon16.png',
    48: 'assets/img/icon48.png',
    128: 'assets/img/icon128.png'
  },
  action: {
    default_icon: 'assets/img/icon16.png',
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [
    {
      js: ['src/content/main.ts'],
      matches: ['http://*/*', 'https://*/*']
    }
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      port: 5174,
    },
  },
})
