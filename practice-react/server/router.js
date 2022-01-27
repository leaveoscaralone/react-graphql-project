const { Router } = require('express');
const router = Router();
const controller = require('./controller/index')


router.get('/topics', controller.getAll)
router.post('/topics', controller.newTopic)
router.put('/topics/:id/:dir', controller.voteTopic)
router.delete('/topics/:id', controller.deleteTopic)

module.exports = router;
