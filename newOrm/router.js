const Router = require('koa-router');
const router = new Router();
const message = require('./controller/message')

router.get('/messages', message.getAll)
router.post('/messages', message.post)

module.exports = router;