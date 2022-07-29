import { OutputOptions, rollup, RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';
import dts from "rollup-plugin-dts";
import path from 'path'
import fs from 'fs/promises'

const rootPath = path.join(__dirname, '..')

const packageJson = require(`${rootPath}/package.json`)
delete packageJson.devDependencies
delete packageJson.scripts
const packageName = packageJson.name
packageJson.main = 'cjs/index.js'

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

  const outputDir = path.join(rootPath, `dist/${type}/${name}`)
  const outputs: OutputOptions[] = [{
    format: 'es',
    dir: path.join(outputDir, `es`)
  }, {
    format: 'cjs',
    dir: path.join(outputDir, `cjs`)
  }]

  const writePackageJson = async () => {
    packageJson.name = `@${packageName}-${type}/${name.toLowerCase()}`
    fs.writeFile(outputDir + '/package.json', JSON.stringify(packageJson))
  }
  return {
    inputs: [inputOptionJs, inputOptionDts],
    outputs,
    writePackageJson
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
      await option.writePackageJson()
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

