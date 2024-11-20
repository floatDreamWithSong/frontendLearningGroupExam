import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Counter',
      fileName: 'counter'
    },
    rollupOptions: {
      // external: ["moment"],
      // output: {
      //   globals: {
      //     moment: "moment",
      //   },
      // }
    }
  }
})
