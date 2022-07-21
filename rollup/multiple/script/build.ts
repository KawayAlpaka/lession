// const rollup = require('rollup');
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import path from 'path'

console.log('rollup', rollup)

const inputOptions: RollupOptions = {
  input: path.join(__dirname, "../src/lib/wx.ts"),
  plugins: [
    babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
  ]
}

const outputOption: OutputOptions = {
  // file: 'bundle.js',
  format: 'cjs',
  dir: path.join(__dirname, "../dist")
}

build()
async function build() {
  try {
    const bundle = await rollup(inputOptions)
    await bundle.write(outputOption)
    // const {output} = await bundle.generate(outputOption) 
    // console.log(output)
  } catch (error) {
    console.error(error)
  }
}

