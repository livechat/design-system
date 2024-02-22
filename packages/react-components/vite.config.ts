/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath } from 'node:url';
import * as path from 'path';
import { extname, relative } from 'path';

import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import turbosnap from 'vite-plugin-turbosnap';

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
        name: 'dsrc',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format}.js`,
      },
      rollupOptions: {
        external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
        input: Object.fromEntries(
          glob.sync('src/**/index.{ts,tsx}').map((file) => {
            return [
              relative(
                'src',
                file.slice(0, file.length - extname(file).length)
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ];
          })
        ),
        output: {
          chunkFileNames: 'chunks/[name]-[hash].js',
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
      mode === 'production' && turbosnap({ rootDir: process.cwd() }),
    ],
  };
});
