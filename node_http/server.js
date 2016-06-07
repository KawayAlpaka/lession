var http = require('http');
// console.log(http);

const server = http.createServer((req, res) => {
    // console.log("req.url：");
    // console.log(req.url);
    // console.log("req.headers：");
    // console.log(req.headers);
    // console.log("req.method：");
    // console.log(req.method);

    var statusCode = 200;


    switch (req.url){
        case "/100": statusCode = 100; break;
        case "/101": statusCode = 101; break;
        case "/102": statusCode = 102; break;
        default: statusCode = 200;
    }

    res.writeHead(statusCode, {
        'Content-Type': 'text/plain',
        // 'Content-Type': 'text/html',
        // 'Content-Type': 'application/octet-stream',
        // 'Allow': 'GET, HEAD',
        'Allow': 'POST',
        'Trailer': 'Content-MD5' ,
        // 'Location': 'http://www.baidu.com/',
        '1':'1'
    });

    res.write("<html><a href='/'>go</a></html>");
    res.end();

    // switch (req.url){
    //     case "/100":
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain',
    //             'Trailer': 'Content-MD5' ,
    //             // 'Location': 'http://www.baidu.com/',
    //             '1':'1'
    //         });
    //         res.write("hello");
    //         res.end();
    //         break;
    //     case "/101": statusCode = 101; break;
    //     case "/102": statusCode = 102; break;
    //     default: statusCode = 200;
    // }

});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.on('checkContinue', (request, response) => {
    console.log('checkContinue');
});
server.on('close', () => {
    console.log('close');
});
server.on('connect', (request, socket, head) => {
    console.log('connect');
});
server.on('connection', (socket) => {
    console.log('connection');
});
server.on('request', (request, response) => {
    console.log('request');
});
server.on('upgrade', (request, socket, head) => {
    console.log('upgrade');
});
server.listen(8000);
