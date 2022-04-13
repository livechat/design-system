/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['../icons/react/material'],
  },
  css: {
    modules: {
      generateScopedName: 'lc-[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dsrc',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `dsrc.${format}.js`,
    },
    rollupOptions: {
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      'test-utils': path.resolve(__dirname, 'src/test/utils.ts'),
      '@livechat/design-system-icons/react/material': path.resolve(
        __dirname,
        '../icons/lib/react/material'
      ),
    },
  },
  plugins: [dts(), react({ jsxRuntime: 'classic' })],
});
