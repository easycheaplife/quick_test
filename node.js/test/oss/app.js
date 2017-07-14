var oss = require('ali-oss');
var co = require('co');
var fs = require('fs');
var config = require('./oss.json')

console.log(config)
var client = new oss({
	  accessKeyId: config.accessKeyId,
	  accessKeySecret: config.accessKeySecret,
	  region: config.region,
});

function listBuckets() {
	co(function* () {
		  var result = yield client.listBuckets();
			console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function put(){
	co(function* () {
		client.useBucket('test20170712');
		var result = yield client.put('package.json', '/tmp/package.json');
		console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function get(){
	co(function* () {
		client.useBucket('test20170712');
		var result = yield client.get('package.json', '/tmp/package.json.oss');
		console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

listBuckets()
//put()
//get()

