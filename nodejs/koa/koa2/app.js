const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log("async");
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 响应
app.use(ctx => {
  console.log("Hello Koa");
  ctx.body = 'Hello Koa';
});

app.listen(3000);