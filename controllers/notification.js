const Notifications = require('../models/notification')

const notification = {
    create: async (req, res) => {
        try {
            const {id, recipients, url, text, content, image} = req.body

            if(recipients.includes(req.user._id.toString())) return;

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
            .sort('-createdAt').populate('user', 'avatar username fullname')

            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    isRead: async (req, res) => {
        try {
            const notifies =  await Notifications.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })

            return res.json({notifies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAll: async (req, res) => {
        try {
            const notifies =  await Notifications.deleteMany({recipients: req.user._id})

            return res.json({notifies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = notification