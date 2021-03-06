const router = require('express').Router()
const notificationCtrl =  require('../controllers/notification')
const auth = require('../middleware/auth')


router.post('/notify', auth, notificationCtrl.create)

router.delete('/notify/:id', auth, notificationCtrl.delete)

router.get('/notifies', auth, notificationCtrl.get)

router.patch('/isReadNotify/:id', auth, notificationCtrl.isRead)

router.delete('/deleteAllNotify', auth, notificationCtrl.deleteAll)



module.exports = router