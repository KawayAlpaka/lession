const path = require("path")

const  spawn = require('./lib/spawn');
// const ls = spawn('ls', ['-lh', '/usr']);
// const ls = spawn('curl');
// const ls = spawn('cmd',['/c'].concat("npm", ["--version"]));   // windows下，需要这样才能正常运行
// const ls = spawn("python", ["H:/lession/python/syntax/test.py"]);
const ls = spawn("node", [path.join(__dirname,"child.js")]);


// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`子进程退出，退出码 ${code}`);
// });

console.log("haha")

setTimeout(()=>{
  spawn("npm", ["--version"]);
},10*1000)


process.stdout.write("process.stdout.write\n");