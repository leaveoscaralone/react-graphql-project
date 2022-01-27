const { Router } = require('express')
const router = Router();
const {
    getMessages,
    postMessages
} = require('./controller')

router.get('/messages', getMessages)
router.post('/messages', postMessages)

module.exports = router;