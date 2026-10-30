import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: '../node_modules/.vite',
  plugins: [swc.vite({ module: { type: 'es6' } })],
  test: {
    globals: true,
    root: './test',
    include: ['**/*.e2e-spec.ts'],
    environment: 'node',
  },
});
