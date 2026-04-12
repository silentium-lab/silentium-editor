import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'forks',
    globals: true,
    reporters: ['default'],
  },
  resolve: {},
  outputFile: {
    json: './reports/vitest-results.json',
  },
});
