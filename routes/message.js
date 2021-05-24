const router = require('express').Router()
const messageCtrl = require('../controllers/message')
const auth = require('../middleware/auth')

router.post('/mesasge', auth, messageCtrl.createMessage)


module.exports = router