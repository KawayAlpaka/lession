
// import dts from 'dts-bundle'
import path from 'path'
// console.log(dts.default)
// dts.bundle({
//     name: 'cool-project',
//     main: 'build/index.d.ts'
// });


// const dts = require('dts-bundle');
// // console.log(dts.bundle)
// dts.bundle({
//     name: 'cool-project',
//     main: path.join(__dirname,'../src/test/ts/main.ts')
// });

import { generateDtsBundle } from 'dts-bundle-generator'
console.log(generateDtsBundle)
const data = generateDtsBundle([{
  filePath:path.join(__dirname,'../src/test/ts/main.ts'),
}])
console.log(data)