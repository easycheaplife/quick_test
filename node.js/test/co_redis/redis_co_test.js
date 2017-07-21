var co = require('co');
var log4js = require('log4js');
var redis = require("redis");
var wrapper = require('co-redis');
var table_objects =  'l_test';

/*
 * log level as follows:
 * trace
 * debug
 * info
 * warn
 * error
 * fatal
 */
log4js.configure({
	  appenders: { migration: { type: 'file', filename: 'migration.log' } },
	  categories: { default: { appenders: ['migration'], level: 'debug' } }
});

const logger = log4js.getLogger('migration');

var redis_client = redis.createClient({host: '127.0.0.1',port: 6379});
var redis_co = wrapper(redis_client);

co(function* () {
	  object_name = yield redis_co.rpop(table_objects);
	  console.log(object_name);
});
console.log('end');
process.exit();

