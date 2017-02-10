var connect = require('connect');
var serveStatic = require('serve-static');
var server = connect();
server.use(serveStatic('www'));
server.listen(8080);