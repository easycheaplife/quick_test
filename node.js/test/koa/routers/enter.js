const Router = require('koa-router');
const test = require('../controller/testController');
const router = new Router();

router.get('/test',test.test);
router.get('/test1',test.test1);
router.get('/test2',test.test2);

module.exports = router;
