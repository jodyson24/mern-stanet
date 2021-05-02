const Notifications = require('../models/notification')

const notification = {
    create: async (req, res) => {
        try {
            const {id, recipients, url, text, content, image} = req.body

            const notify = new Notifications({
                id, recipients, url, text, content, image, user: req.user._id
            })

            await notify.save()

            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async (req, res) => {
        try {
            const notify =  await Notifications.findOneAndDelete({
                id: req.params.id, url: req.query.url
            })

            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    get: async (req, res) => {
        try {
            const notify =  await Notifications.find({recipients: req.user._id})
            .sort('isRead').populate('user', 'avatar username fullname')

            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = notification