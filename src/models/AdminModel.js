import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AdminModel = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export default mongoose.model('Admin', AdminModel)
