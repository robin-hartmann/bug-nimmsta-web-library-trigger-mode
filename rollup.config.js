import commonjs from '@rollup/plugin-commonjs'
import html from '@rollup/plugin-html'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

/** @type {import('rollup').RollupOptions} */
const options = {
  input: './src/index.ts',
  output: {
    dir: './www/',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.dist.json',
    }),
    html({
      title: 'bug-nimmsta-web-library-trigger-mode',
    }),
  ],
}

export default options
