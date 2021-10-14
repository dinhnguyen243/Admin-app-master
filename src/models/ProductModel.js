import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductModel = new Schema({
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    hard_disk: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    core: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    monitor: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    vga: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price_income: {
        type: Number,
        required: true
    },
    price_outcome: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        required: true,
        default: []
    },
    link_review: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Product', ProductModel)
