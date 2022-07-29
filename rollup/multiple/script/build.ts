import { rollup } from 'rollup';
import { getTargetPackages, writePackageJson } from './packages';
import { getOptions } from './option';


build()

async function build() {
  try {
    const packages = await getTargetPackages()
    const options = getOptions(packages)
    for (const option of options) {
      for (const inputOption of option.inputs) {
        const bundle = await rollup(inputOption)
        for (const outputOption of option.outputs) {
          await bundle.write(outputOption)
        }
        await writePackageJson(option.package)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

