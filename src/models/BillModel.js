import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BillModel = new Schema({
    bill_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    voucher_id: { type: String, default: 'None' },
    status: { type: Boolean, default: false },
    total_price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now()}
})

export default mongoose.model('Bill', BillModel)
