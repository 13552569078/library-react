import path from 'path';
import { defineConfig } from 'vitest/config';

const resolve = (src: string) => {
  return path.resolve(__dirname, src);
};

const isDist = process.env.LIB_DIR === 'dist';

export default defineConfig({
  resolve: {
    alias: isDist
      ? {
          'ai-arco-material': resolve('./dist/esm/index.js'),
        }
      : {
          'ai-arco-material': resolve('./src/index.ts'),
        },
  },
  test: {
    environment: 'jsdom',
    include: ['./packages/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
    reporters: ['default'],
    coverage: {
      include: ['packages/*/src/**/*.{tx,tsx}'],
      exclude: ['**/demos/*.tsx'],
      reporter: ['json-summary', ['text', { skipFull: true }], 'cobertura', 'html'],
    },
    testTimeout: 3e4,
  },
});
