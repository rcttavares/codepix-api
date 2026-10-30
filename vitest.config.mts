import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: '../node_modules/.vite',
  plugins: [swc.vite({ module: { type: 'es6' } })],
  test: {
    globals: true,
    root: './src',
    include: ['**/*.spec.ts'],
    environment: 'node',
    coverage: {
      include: ['**/*.ts'],
      reportsDirectory: '../coverage',
    },
  },
});
