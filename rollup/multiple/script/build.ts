import { OutputOptions, rollup, RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";
import path from 'path'
import fs from 'fs/promises'

const rootPath = path.join(__dirname, '..')

type TBuildType = 'lib' | 'component'

const genOption = ({ type, name }: { type: TBuildType, name: string }) => {
  const inputFile = path.join(rootPath, `src/${type}/${name}/index.${type === 'lib' ? 'ts' : 'tsx'}`)
  const inputOptionJs: RollupOptions = {
    external: ['react'],
    input: inputFile,
    plugins: [
      babel({ babelHelpers: 'bundled', extensions: ['.ts', '.tsx'] }),
    ]
  }
  const inputOptionDts: RollupOptions = {
    external: ['react'],
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

async function buildType(type: TBuildType) {
  const names = await fs.readdir(path.join(rootPath, `src/${type}`))
  for (const name of names) {
    const option = genOption({ type, name: name })
    for (const inputOption of option.inputs) {
      const bundle = await rollup(inputOption)
      for (const outputOption of option.outputs) {
        await bundle.write(outputOption)
      }
    }
  }
}

async function build() {
  try {
    await buildType('lib')
    await buildType('component')
  } catch (error) {
    console.error(error)
  }
}

