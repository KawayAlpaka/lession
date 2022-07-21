// const rollup = require('rollup');
import { OutputOptions, rollup } from 'rollup';
import path from 'path'

console.log('rollup',rollup)

const inputOptions = {
  input: path.join(__dirname,"../src/lib/wx.ts")
}

const outputOption:OutputOptions = {
  // file: 'bundle.js',
  format: 'cjs',
  dir: path.join(__dirname,"../dist")
}

build()
async function build (){
  try {
    const bundle = await rollup(inputOptions)
    await bundle.write(outputOption)
    // const {output} = await bundle.generate(outputOption) 
    // console.log(output)
  } catch (error) {
    console.error(error)
  }


}

