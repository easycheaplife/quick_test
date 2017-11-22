log = require('../util/logger');
var logger = async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	log.access.debug(`${ctx.method} ${ctx.url} - ${ms}`);
}

module.exports = logger;
