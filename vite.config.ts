import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Index',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['@vitest/ui','vitest'],
      output: {
        globals: {
          vitest: 'vitest',
          '@vitest/ui':'@vitest/ui'
        },
      }
    }
  }
})
