const log4js = require('log4js');
log4js.configure({
	  appenders: { access: { type: 'file', filename: 'access.log' } },
	  categories: { default: { appenders: ['access'], level: 'debug' } }
});
var logger_access = log4js.getLogger('access');

module.exports = {
	access:logger_access
}
