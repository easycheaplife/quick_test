var oss = require('ali-oss');
var co = require('co');
var fs = require('fs');
var config = {}
var objectKey = 'civetweb-10rw.png';

if(process.argv.length != 3){
	console.error('param error! please input: node app oss');
	process.exit()	
}	
if(process.argv[2] == 's3'){
	config = require('./s3.json')	
}else if (process.argv[2] == 'oss'){
	config = require('./oss.json')
}

var client = new oss({
	  accessKeyId: config.accessKeyId,
	  accessKeySecret: config.accessKeySecret,
	  endpoint: config.endpoint,
	  region: config.region // if endpoint provide, region will be ignore.
});

function putBucket(){
	co(function* () {
		  var result = yield client.putBucket(config.bucket);
			console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function delBucket(){
	co(function* () {
		  var result = yield client.deleteBucket(config.bucket);
			console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function listBuckets() {
	co(function* () {
		  var result = yield client.listBuckets();
			console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function list(){
	co(function* () {
		client.useBucket(config.bucket);
		var max_keys = 1;
		var result = yield client.list( {"max-keys": max_keys,'delimiter':'/'} );
		console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function put(){
	co(function* () {
		client.useBucket(config.bucket);
		var result = yield client.put(objectKey, '/tmp/civetweb-10rw.png',{ headers: {
				      'x-oss-object-acl': 'public-read'
					}
				}
			);
		console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function get(){
	co(function* () {
		client.useBucket(config.bucket);
		var result = yield client.get(objectKey, '/tmp/civetweb-10rw.png.oss');
		console.log(result);
	}).catch(function (err) {
		  console.log(err);
	});
}

function del(){
	co(function* (){
		client.useBucket(config.bucket);
		var result = yield client.delete(objectKey);
		console.log(result);
	}).catch(function (err) {
		console.log(err); 
	});
}

function set_acl(acl){
	co(function* (){
		client.useBucket(config.bucket);
		var result = yield client.putACL(objectKey,acl);
		console.log(result);
	}).catch(function (err) {
		console.log(err); 
	});
}

function get_acl(acl){
	co(function* (){
		client.useBucket(config.bucket);
		var result = yield client.getACL(objectKey);
		console.log(result.acl);
	}).catch(function (err) {
		console.log(err); 
	});
}

//putBucket()
//delBucket()
//listBuckets()
list()
//put()
//set_acl('public-read')
//get_acl()
//get()
//del()

