import babel from "@rollup/plugin-babel"
import path from "path"
import { OutputOptions, RollupOptions } from "rollup"
import { IPackage } from "./packages"
import { rootPath } from "./root"
import dts from "rollup-plugin-dts";

export const genOption = ({ type, name }: IPackage) => {
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

  return {
    inputs: [inputOptionJs, inputOptionDts],
    outputs
  }
}


export const getOptions = (packages: IPackage[]) => {
  return packages.map((p) => {
    return {
      ...genOption(p),
      package: p
    }
  })
}