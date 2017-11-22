const log4js = require('log4js');
log4js.configure(require('../config/log4js'));

module.exports = {
	access:log4js.getLogger('access'),
	api:log4js.getLogger('api')
}
