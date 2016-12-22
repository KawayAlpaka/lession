var schedule = require('node-schedule');


var date = new Date(2016, 11, 22, 10, 58, 0);

console.log(date.toLocaleString());

var j1 = schedule.scheduleJob(date, function(){
    console.log('The world is going to end today.');
});

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 12;
rule.minute = 4;
var j2 = schedule.scheduleJob(rule, function(){
    console.log("执行任务");
});


var j3 = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('每分钟执行');
});