import babel from '@rollup/plugin-babel';
// import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { rollup } from 'rollup';

rollup({
  // input: path.join(__dirname, '../src/test/js/main.js'),
  input: path.join(__dirname, '../src/test/ts/main.ts'),
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    babel({ babelHelpers: 'bundled', extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
  ]
}).then(async (bundle) => {
  bundle.write({
    format: 'cjs',
    dir: path.join(__dirname, `../dist`)
  })
})
