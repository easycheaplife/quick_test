const Koa = require('koa');
const app = new Koa();
const router = require('./routers/enter')

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.on('error', err => {
	log.error('server error', err)
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
