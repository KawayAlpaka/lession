var spawn = require('child_process').spawn;
free = spawn('free', ['-m']);
// free = spawn('ride.py', []);
// 捕获标准输出并将其打印到控制台
free.stdout.on('data', function (data) {
    console.log('standard output:\n' + data);
});
// 捕获标准错误输出并将其打印到控制台
free.stderr.on('data', function (data) {
    console.log('standard error output:\n' + data);
});
// 注册子进程关闭事件
free.on('exit', function (code, signal) {
    console.log('child process eixt ,exit:' + code);
});