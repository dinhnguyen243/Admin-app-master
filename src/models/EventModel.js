import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EventModel = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    link_img: {type: String},
    status: {type: Boolean, default: true},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export default mongoose.model('Event', EventModel)
