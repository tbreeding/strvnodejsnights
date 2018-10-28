const Koa = require('koa');
const koaCompress = require('koa-compress');
const koaCors = require('kcors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaCompress());
app.use(koaCors());
app.use(koaBody());

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000, () => console.log('Listening on port 3000!'))