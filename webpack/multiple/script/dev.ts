import webpack from 'webpack';
import { getTargetPackages, TBuildType, writeDts, writePackageJson } from './packages';
import { getOptions } from './option';

dev()

async function dev() {
  try {
    const packages = await getTargetPackages()
    const options = getOptions(packages)
    const compiler = webpack(options.map(item => item.option))
    compiler.watch({

    }, async (err, result) => {
      console.log('err:', err)
      // console.log('result:', result)
      result.stats.forEach(async (stat) => {
        const optionName = stat.compilation.options.name as string
        console.log('name:', optionName)
        if (stat.hasErrors()) {
          console.log('errors:', stat.compilation.errors)
        } else {
          const [type, name] = optionName.split('/') as [TBuildType, string]
          await writePackageJson({ type, name })
          writeDts({ type, name })
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}

