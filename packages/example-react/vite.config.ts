import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@livechat/design-system-icons/react/material'],
  },
  plugins: [react()],
});
