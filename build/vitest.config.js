import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/test/**/*.test.ts', 'src/**/test.ts', 'test/**/*.ts', 'src/**/*.test.ts'],
  },
});
