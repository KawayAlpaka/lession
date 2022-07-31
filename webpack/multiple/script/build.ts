import webpack from 'webpack';
import { getTargetPackages, writeDts, writePackageJson } from './packages';
import { getOptions } from './option';

build()

async function build() {
  try {
    const packages = await getTargetPackages()
    const options = getOptions(packages)
    const compiler = webpack(options.map(item => item.option))
    compiler.run(async (err, result) => {
      console.log('err:', err)
      if(!result.hasErrors()){
        for(const item of options){
          await writePackageJson(item.package)
          writeDts(item.package)
        }
      }

      result.stats.forEach(async (stat) => {
        if(stat.hasErrors()){
          console.log('errors:', stat.compilation.errors)
        }
      })

    })
  } catch (error) {
    console.error(error)
  }
}

