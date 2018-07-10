const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const multicastAddr = '224.100.100.100';

client.on('close',()=>{
    console.log('socket已关闭');
});

client.on('error',(err)=>{
    console.log(err);
});
client.on('listening',()=>{
    console.log('socket正在监听中...');
    client.addMembership(multicastAddr);
});
client.on('message',(msg,rinfo)=>{
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
    //单独回复
    client.send('我是客户端，我已经收到你的消息',rinfo.port,rinfo.address);
});
client.bind(8061);