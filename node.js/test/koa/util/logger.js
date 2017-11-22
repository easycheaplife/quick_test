const log4js = require('log4js');
log4js.configure(require('../config/log4js'));
var logger_access = log4js.getLogger('access');

module.exports = {
	access:logger_access
}
