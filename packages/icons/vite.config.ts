/// <reference types="vite/client" />
import { resolve } from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import entryConfig from './entryConfig.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'lib/index.ts'),
        ...entryConfig,
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
});
