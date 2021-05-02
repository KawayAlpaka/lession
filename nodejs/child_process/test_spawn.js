const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);
// const ls = spawn('curl');
const ls = spawn('cmd',['/c'].concat("npm", ["--version"]));   // windows下，需要这样才能正常运行

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
