const router = require('express').Router()
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth')

router.post('/mesasge', auth, messageCtrl.createMessage)

router.get('/conversations', auth, messageCtrl.getConversations)

router.get('/message/:id', auth, messageCtrl.getMessages)

router.delete('/message/:id', auth, messageCtrl.deleteMessages)

router.delete('/conversation/:id', auth, messageCtrl.deleteConversation)


module.exports = router