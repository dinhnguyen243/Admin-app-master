import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BillDetailModel = new Schema({
    customer_id: { type: String, required: true },
    product_id: {type: String, required:true},
    voucher_id: { type: String, default: 'None' },
    bill_id: {type: String, required: true},
    status: { type: Boolean, default: false},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    last_price: {type: Number, required: true},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export default mongoose.model('BillDetail', BillDetailModel)
 