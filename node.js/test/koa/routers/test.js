var test = async  (ctx, next) => {
	// ctx.router available
	ctx.body = {'msg' : "koa router test"};
};

var test1 = async  (ctx, next) => {
	// ctx.router available
	ctx.body = {'msg' : "koa router test1"};
};

module.exports = {
	test,
	test1
};

