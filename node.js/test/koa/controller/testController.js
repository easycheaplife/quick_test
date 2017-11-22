log = require('../util/logger');
const axios = require('axios');
let url = 'http://192.168.3.75:8000/oa/provider/list';
let param = {'token':'f8ulxAVrj4nl9X1qmkiGf17vcqKTtYTQ2XTVvlC9E1F2mndHOskdNHWC2kHS'};

var test = async  (ctx, next) => {
	// ctx.router available
	await axios.post(
			url,param
		).then(function (response) {
			ctx.body = response.data;
			log.api.debug(response.data);
		}).catch(function (error) {
			log.api.error(error);
		});
};

var test1 = async  (ctx, next) => {
	function get_url1() { return axios.post(url,param);}
	function get_url2() { return axios.post(url,param);}
	let res = await axios.all([get_url1(),get_url2()])
		.then(axios.spread(function (res1, res2) {
			return [res1.data,res2.data];
		}));
	ctx.body = res;
};

var test2 = async  (ctx, next) => {
	// ctx.router available
	ctx.body = {'msg' : "koa router test1"};
};

module.exports = {
	test,
	test1,
	test2
};

