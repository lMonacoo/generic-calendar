import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// @ts-ignore
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  base: '/generic-calendar/',
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [react()],
  envDir: './configs'
});
