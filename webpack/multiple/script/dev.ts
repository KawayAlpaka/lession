import { watch } from 'rollup';
import { getOptions } from './option';
import { getTargetPackages, writePackageJson } from './packages';



dev()

async function dev() {
  try {
    const packages = await getTargetPackages()
    const options = getOptions(packages)
    for (const option of options) {
      for (const input of option.inputs) {
        const watcher = watch({
          ...input,
          output: option.outputs
        })
        watcher.on('event', (e) => {
          // console.log('aaaaaaaaaaaaaaaa:', Date.now())
          // console.log(e)
          if(e.code === 'BUNDLE_START'){
            console.log('BUNDLE_START:',e.input)
          }
          if(e.code === 'BUNDLE_END'){
            console.log('BUNDLE_END:',e.result.watchFiles)
          }
          if (e.code === 'END') {
            writePackageJson(option.package)
          }
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
