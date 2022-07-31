import path from "path"
import { Configuration } from "webpack"
import { IPackage } from "./packages"
import { rootPath } from "./root"

const extensions = ['.ts', '.tsx', '.js', '.jsx']

export const genOption = ({ type, name }: IPackage): Configuration => {
  const inputFile = path.join(rootPath, `src/${type}/${name}/index.${type === 'lib' ? 'ts' : 'tsx'}`)
  const outputDir = path.join(rootPath, `dist/${type}/${name}/cjs`)


  return {
    name:`${type}/${name}`,
    mode: 'development',
    externals: ['react'],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader:'babel-loader'
            },
            // {
            //   loader: path.join(rootPath,'script/dts-loader/dts-loader')
            // }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.js?x$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions
    },
    entry: inputFile,
    output: {
      path: outputDir,
      libraryTarget: 'commonjs2',
      filename: 'index.js'
    }
  }
}


export const getOptions = (packages: IPackage[]) => {
  return packages.map((p) => {
    return {
      option: genOption(p),
      package: p
    }
  })
}
