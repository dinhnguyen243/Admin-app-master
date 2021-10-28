import ProductModel from '../../models/ProductModel.js'
const listAllProduct = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const products = await ProductModel.find(
        {},
        {
            __v: 0
        }
    )

    res.status(200).json(products)
}

const listNewProduct = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const products = await ProductModel.find({},{__v: 0}).sort({
        created_at: 'desc'
    })
    
    res.status(200).json(products)
}

const getProductDetail = async (req, res) => {
    const method = req.method
    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }
    const { id } = req.params
    const product = await ProductModel.findOne({ product_id: id }, { __v: 0 })

    res.status(200).json(product)
}

export default {
    listAllProduct,
    listNewProduct,
    getProductDetail
}
