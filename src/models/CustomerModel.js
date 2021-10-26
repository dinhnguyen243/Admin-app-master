import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CustomerModel = new Schema({
    user: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: false , default: '' },
    address: {type: String, required: false, default: 'không có'},
    birthday: { type: Date, required: false, default: Date.now() },
    email: { type: String, required: true },
    phone: { type: String, required: false, default: 'không có' },
    status: { type: Boolean, required: false , default: true},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export default mongoose.model('Customer', CustomerModel)
