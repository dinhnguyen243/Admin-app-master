import mongoose from 'mongoose'
const Schema = mongoose.Schema

const VoucherModel = new Schema({
    voucher_code: { type: String, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export default mongoose.model('Voucher', VoucherModel)
