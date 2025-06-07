import { defineConfig } from 'vite'
// @ts-expect-error No error expected
import eslint from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    eslint({
      fix: true,
    }),
    dts({ include: ['lib'] }),
  ],
  build: {
    lib: {
      name: 'JsApp',
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['rxjs', 'rxjs/operators'],
      output: {
        globals: {
          rxjs: 'rxjs',
          'rxjs/operators': 'rxjs.operators',
        },
      },
    },
  },
})
