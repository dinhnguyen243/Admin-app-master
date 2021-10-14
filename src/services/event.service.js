import EventModel from "../models/EventModel.js"

const insertEventService = async (event) => {
    const _docsEvents = await EventModel.create(event)
    return _docsEvents
}


const getDetailEventService = async (id) => {
    const _docsEvents = await EventModel.findById(id)
    return _docsEvents
}

const updateEventService = async (id, event) => {
    const _docsEvents = await EventModel.findByIdAndUpdate(id, {
        ...event,
        updated_at: Date.now()
    })
    return _docsEvents
}

const deleteEventService = async (id) => {
    const _docsEvents = await EventModel.findByIdAndDelete(id)
    return _docsEvents
}


const listAllEventService = async () => {
    const _docsEvents = await EventModel.find({})

    return _docsEvents
}

const size = async () => {
    const _size = await EventModel.countDocuments({})
    return _size
}

export default {
    insertEventService,
    getDetailEventService,
    updateEventService,
    deleteEventService,
    listAllEventService,
    size
}
