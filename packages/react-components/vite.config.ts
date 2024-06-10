/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  return {
    css: {
      modules: {
        generateScopedName: 'lc-[name]__[local]___[hash:base64:5]',
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format}.js`,
      },
      rollupOptions: {
        external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
        output: {
          globals: {
            react: 'React',
          },
        },
      },
      target: ['esnext', 'es6'],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
    resolve: {
      alias: {
        'test-utils': path.resolve(__dirname, 'src/test/utils.ts'),
      },
    },
    plugins: [
      dts({
        include: [
          'src/index.ts',
          'src/foundations',
          'src/utils',
          'src/components',
        ],
        exclude: ['**/*.stories.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      }),
      react({ jsxRuntime: 'classic' }),
    ],
  };
});
