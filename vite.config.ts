import { defineConfig } from 'vite';
import { crx, defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest({
  manifest_version: 3,
  name: '文字サイズ（フォントサイズ）変更',
  description: '文字サイズ（フォントサイズ）を変更できます。',
  version: '1.0.4',
  icons: {
    16: 'img/icon16.png',
    48: 'img/icon48.png',
    128: 'img/icon128.png',
  },
  action: {
    default_icon: 'img/icon16.png',
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [
    {
      js: ['src/content/main.ts'],
      matches: ['http://*/*', 'https://*/*'],
    },
  ],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
