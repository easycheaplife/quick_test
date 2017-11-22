const Koa = require('koa');
const app = new Koa();
const logger = require('./middleware/logger');
const response = require('./middleware/response');
const router = require('./routers/enter')

// middleware for logger
app.use(logger);
// middleware for x-response-time
app.use(response);

app.on('error', err => {
	log.error('server error', err)
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
