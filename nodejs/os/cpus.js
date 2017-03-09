const os = require('os');

// console.log(os.cpus());

var cpus = os.cpus();
var spead = 3315 * 2014;
cpus.forEach(function (cpu) {
    var total = cpu.times.user + cpu.times.sys + cpu.times.idle + cpu.times.irq;
    var totalUse = cpu.times.user + cpu.times.sys + cpu.times.irq;
    var zhanyonglv = (totalUse/ spead).toFixed(2);
    console.log((total/ spead).toFixed(2) + "  " + zhanyonglv);
});