
var async = require('async');
/*
async.waterfall( [ function(cb) { console.log('1.1.1: ', 'start'); cb(null, 31); },function(n, cb) { console.log('1.1.2: ',n); }],function(err, result) {});
*/

var waterfall = function(){
	async.waterfall([
		function(callback){
			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback){
			console.log("step 1 ..." + arg1 + "..." + arg2);
			callback(null, 'three');
		},
		function(arg1, callback){
			// arg1 now equals 'three'
			callback(null, 'done');
			console.log("step 2 ..." + arg1);
		}
	], function (err, result) {
	   // result now equals 'done'    
		console.log("step 3 ..." +result);
	});
}

var whilst = function(){
	var count = 0;
	console.log("whilst start");
	async.whilst(
		function () { return count < 5; },
		function (callback) {
			count++;
			console.log(count);
			async.waterfall( [ function(cb) { console.log('1.1.1: ', 'start'); cb(null, 31); },function(n, cb) { console.log('1.1.2: ',n); }],function(err, result) {});
			setTimeout(callback, 100);
		},
		function (err) {
			// 5 seconds have passed
			console.log("whilst end");
		}
	);
}

waterfall();

var test = function(){
	var count = 65;
	async.whilst(
		function () { return count <= 90; },			
		function (callback) {
			async.waterfall([
					function(callback){
						callback(null);
					},
					function(callback){
						++count;
						callback(null);
					}
				],
				function(err){
					if(err){
						console.error(err);
					}
					console.log(count);
					callback(null);
				}
			);
		},
		function (err) {
			if(err){
				console.error(err);
			}
			console.log("end");
		}
	);
}

var test1 = function(){
	var count = 65;
	async.whilst(
		function () { return count <= 90; },			
		function (callback) {
			++count;
			console.log(count);
			callback(null);
		},
		function (err) {
			if(err){
				console.error(err);
			}
			console.log("end");
		}
	);
}

test();
test1();

var for_each_of = function(){
	var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
	var configs = {};
	async.forEachOf(obj, function (value, key, callback) {
		console.log(key + ":" + value);

		require('fs').readFile(__dirname + value, "utf8", function (err, data) {
			if (err) return callback(err);
			try {
				configs[key] = JSON.parse(data);
			} catch (e) {
				return callback(e);
		    }
			 callback();
		})

	}, function (err) {
		if (err) console.error(err.message);
		console.log(configs);
	})
}

for_each_of();
