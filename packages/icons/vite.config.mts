/// <reference types="vite/client" />

import { extname, relative, resolve } from 'path';

import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob.sync('lib/*.{ts,tsx}').map((file) => {
          return [
            relative('lib', file.slice(0, file.length - extname(file).length)),
            `./${file}`,
          ];
        })
      ),
    },
  },
});
