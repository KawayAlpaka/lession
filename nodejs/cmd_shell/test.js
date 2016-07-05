// const execFile = require('child_process').execFile;
// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//         if (error) {
//             throw error;
//         }
//         console.log(stdout);
// });

// // On Windows Only ...
// const spawn = require('child_process').spawn;
// const bat = spawn('cmd.exe', ['/c', 'test.bat']);
//
// bat.stdout.on('data', (data) => {
//     console.log(data);
// });
//
// bat.stderr.on('data', (data) => {
//     console.log(data);
// });
//
// bat.on('exit', (code) => {
//     console.log(`Child exited with code ${code}`);
// });

// OR...
const exec = require('child_process').exec;
exec('test.bat', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});