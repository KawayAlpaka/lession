import path from "path";
import { rootPath } from "./root";
import fs from 'fs/promises'

export type TBuildType = 'lib' | 'component'

export interface IPackage {
  name: string
  type: TBuildType
}

export const getTargetPackages = async () => {
  const packages: IPackage[] = []
  const libNames = await fs.readdir(path.join(rootPath, `src/lib`))
  packages.push(...libNames.map(name => ({ name, type: 'lib' as TBuildType })))
  const componentNames = await fs.readdir(path.join(rootPath, `src/component`))
  packages.push(...componentNames.map(name => ({ name, type: 'component' as TBuildType })))
  return packages
}

const packageJson = require(`${rootPath}/package.json`)
delete packageJson.devDependencies
delete packageJson.scripts
const packageName = packageJson.name
packageJson.main = 'cjs/index.js'

export const writePackageJson = async ({ type, name }: IPackage) => {
  const outputDir = path.join(rootPath, `dist/${type}/${name}`)
  packageJson.name = `@${packageName}-${type}/${name.toLowerCase()}`
  await fs.writeFile(outputDir + '/package.json', JSON.stringify(packageJson))
}

