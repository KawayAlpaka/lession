// const rollup = require('rollup');
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";
import path from 'path'

console.log('rollup', rollup)

const inputOptions: RollupOptions = {
  input: path.join(__dirname, "../src/lib/wx.ts"),
  plugins: [
    babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
    dts()
  ]
}

const outputOptions: OutputOptions[] = [{
  format: 'es',
  dir: path.join(__dirname, "../dist")
}]

build()
async function build() {
  try {
    const bundle = await rollup(inputOptions)
    for(const outputOption of outputOptions){
      await bundle.write(outputOption)
    }
    
    // const {output} = await bundle.generate(outputOption) 
    // console.log(output)
  } catch (error) {
    console.error(error)
  }
}

