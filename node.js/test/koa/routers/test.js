var test = async  (ctx, next) => {
	// ctx.router available
	ctx.body = "koa router test\n";
};

var test1 = async  (ctx, next) => {
	// ctx.router available
	ctx.body = "koa router test1\n";
};

module.exports = {
	test,
	test1
};

