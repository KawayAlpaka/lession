const Koa = require('koa');
const staticFiles = require('koa-static')
const path = require('path')
const https = require('https');
const fs = require('fs')
const bodyParser = require('koa-bodyparser');

var options = {
  key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
  cert: fs.readFileSync('./ssl/server.crt')  //ssl文件路径
};


const app = new Koa();
app.use(async (ctx, next) => {
  ctx.set(`content-security-policy`, `script-src 'self'; object-src 'none'; report-to main-endpoint;`)
  ctx.set(`document-policy`, `document-write=?0;report-to=main-endpoint`)
  ctx.set(`reporting-endpoints`, `main-endpoint="/main", default="/default"`)
  return next()
})
app.use(staticFiles(path.resolve(__dirname, "./static")))
app.use(bodyParser());


app.use(async ctx => {
  console.log("path", ctx.request.path)
  console.log("body", ctx.request.body)
  ctx.body = 'Hello World';
});

https.createServer(options, app.callback()).listen(3000);
