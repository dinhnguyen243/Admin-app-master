import EventModel from '../../models/EventModel.js'

const listAllEvent = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const events = await EventModel.find({}, { __v: 0, updated_at: 0 }).sort({
        created_at: 'desc'
    })

    res.status(200).json(events)
}

export default {
    listAllEvent
}
