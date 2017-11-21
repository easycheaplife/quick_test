const Router = require('koa-router');
const test = require('./test');
const router = new Router();

router.get('/test',test.test);
router.get('/test1',test.test1);

module.exports = router;
