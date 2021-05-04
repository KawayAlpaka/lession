const { spawn } = require('child_process');


function s(command, args, options) {
  const win32 = process.platform === 'win32';

  const cmd = win32 ? 'cmd' : command;
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
  const p = spawn(cmd, cmdArgs, options || {})

  // p.stdout.pipe(process.stdout)

  p.stdout.on("data",e=>{
    console.log("admin",e.toString());
  })

  p.on("message",d=>{
    console.log("message:",d);
  })

  p.on('error', e => {
    console.log("error",e);
  });
  p.on('exit', c => {
    console.log("exit",c);
  });
  return p;
}

module.exports = s;