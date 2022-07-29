import { OutputOptions, rollup, RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";
import path from 'path'
import fs from 'fs/promises'

const rootPath = path.join(__dirname, '..')

const genOption = ({ type, name }: { type: 'lib' | 'component', name: string }) => {
  const inputFile = path.join(rootPath, `src/${type}/${name}/index.ts`)
  const inputOptionJs: RollupOptions = {
    input: inputFile,
    plugins: [
      babel({ babelHelpers: 'bundled', extensions: ['.ts', '.tsx'] }),
    ]
  }
  const inputOptionDts: RollupOptions = {
    input: inputFile,
    plugins: [
      dts()
    ]
  }

  const outputs: OutputOptions[] = [{
    format: 'es',
    dir: path.join(rootPath, `dist/${type}/${name}/es`)
  }, {
    format: 'cjs',
    dir: path.join(rootPath, `dist/${type}/${name}/cjs`)
  }]
  return {
    inputs: [inputOptionJs, inputOptionDts],
    outputs
  }
}

build()
async function build() {
  try {
    const libNames = await fs.readdir(path.join(rootPath, 'src/lib'))
    for (const libName of libNames) {
      const libOption = genOption({ type: 'lib', name: libName })
      for (const inputOption of libOption.inputs) {
        const bundle = await rollup(inputOption)
        for (const outputOption of libOption.outputs) {
          await bundle.write(outputOption)
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

