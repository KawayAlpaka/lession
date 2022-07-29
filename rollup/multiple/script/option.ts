import babel from "@rollup/plugin-babel"
// import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from "path"
import { OutputOptions, RollupOptions } from "rollup"
import { IPackage } from "./packages"
import { rootPath } from "./root"
import dts from "rollup-plugin-dts";

const extensions = ['.ts', '.tsx', '.js', '.jsx']

export const genOption = ({ type, name }: IPackage) => {
  const inputFile = path.join(rootPath, `src/${type}/${name}/index.${type === 'lib' ? 'ts' : 'tsx'}`)
  const inputOptionJs: RollupOptions = {
    external: ['react'],
    input: inputFile,
    plugins: [
      // commonjs(),
      nodeResolve({
        extensions
      }),
      babel({ babelHelpers: 'bundled', extensions }),
    ]
  }
  const inputOptionDts: RollupOptions = {
    external: ['react'],
    input: inputFile,
    plugins: [
      // commonjs(),
      nodeResolve(),
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
    inputs: [
      inputOptionJs, 
      inputOptionDts
    ],
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
