var exec = require('child_process').exec;
var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
         这个stdout的内容就是上面我curl出来的这个东西：
         {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
         */
        var data = JSON.parse(stdout);
        console.log(data);
    }
});