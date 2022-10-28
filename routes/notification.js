const router = require('express').Router()
const notificationCtrl =  require('../controllers/notification')
const auth = require('../middleware/auth')


router.post('/notify', auth, notificationCtrl.createNotify)

router.delete('/notify/:id', auth, notificationCtrl.deleteAllNotifies)

router.get('/notifies', auth, notificationCtrl.getNotifies)

router.patch('/isReadNotify/:id', auth, notificationCtrl.isReadNotify)

router.delete('/deleteAllNotify', auth, notificationCtrl.removeNotify)



module.exports = router