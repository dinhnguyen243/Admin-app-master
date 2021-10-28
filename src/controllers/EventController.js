import eventSerivce from '../services/event.service.js'

class EventController {
    async insertEvent(req, res) {
        const event = req.body
        await eventSerivce.insertEventService(event)
        res.redirect('/danhsachthongbao')
    }

    async getEvent(req, res) {
        const { id } = req.params
        const event = await eventSerivce.getDetailEventService(id)
        res.render('capnhatthongbao', {
            event
        })
    }

    async updateEvent(req, res) {
        const { id } = req.params
        const _event = req.body
        const event = await eventSerivce.updateEventService(id, _event)
        res.redirect('/danhsachthongbao')
    }

    async deleteEvent(req, res) {
        const { id } = req.params
        await eventSerivce.deleteEventService(id)
        res.redirect('/danhsachthongbao')
    }

    async listAllEvent(req, res) {
        const listEvent = await eventSerivce.listAllEventService()
        const size = await eventSerivce.size()
        res.render('danhsachthongbao', {
            listEvent,
            size
        })
    }
}

export default new EventController()
