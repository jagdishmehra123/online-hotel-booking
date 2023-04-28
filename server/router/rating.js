const router = require('express').Router()

const Rating = require('../models/rating')
const clientMiddleware = require('../middleware/client')




router.post('/rate-us', clientMiddleware, async (req, resp) => {
    try {
        const newData = await Rating.create(req.body)
        resp.json({ success: true, message: 'Thank you for your feedback', data: newData })
    }
    catch (err) {
        resp.json({ success: false, message: err })
    }
})



router.get('/get-reviews/:id', async (req, resp) => {
    const id = req.params.id
    try {
        const list = await Rating.find({ resortId :id})
        console.log(list)
        resp.json({ success: true, list: list })
    }
    catch (err) {
        console.log(err)
        resp.json({ success: false, message: err })
    }
})
module.exports = router