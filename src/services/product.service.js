import ProductModel from '../models/ProductModel.js'
import fnv32Auto from '../lib/util.js'

const insertProductService = async (product) => {
    let _docsProduct = {}
    product.img = product.img.split(',')
    if (!(await isProductIsExsited(product.product_id.toUpperCase()))) {
        _docsProduct = await ProductModel.create({
            ...product,
            product_id: product.product_id.toUpperCase()
        })
    } else {
        _docsProduct = await ProductModel.findOneAndUpdate(
            { product_id: product.product_id.toUpperCase() },
            {
                ...product,
                product_id: product.product_id.toUpperCase(),
                updated_at: Date.now()
            }
        )
    }
    return _docsProduct
}

const isProductIsExsited = async (id) => {
    const _product = await ProductModel.exists({ product_id: id })
    return _product ? true : false
}

const getDetailProductService = async (id) => {
    const _docsProduct = await ProductModel.findById(id)
    _docsProduct.img = _docsProduct.img.join(',\r\n')

    return _docsProduct
}

const updateProductService = async (id, product) => {
    product.img = product.img.split(',\r\n')
    const _docsProduct = await ProductModel.findByIdAndUpdate(id, {
        ...product,
        updated_at: Date.now()
    })
    return _docsProduct
}

const deleteProductService = async (id) => {
    const _docsProduct = await ProductModel.findByIdAndDelete(id)
    return _docsProduct
}

const listAllProductService = async () => {
    const _allProducts = await ProductModel.find({})

    return _allProducts
}

const linkReviewListProductService = async () => {
    const _allLink = await ProductModel.find(
        {},
        {
            product_id: 1,
            link_review: 1,
            product_name: 1,
            created_at: 1
        }
    )

    return _allLink
}

const size = async () => {
    const _size = await ProductModel.countDocuments({})
    return _size
}

export default {
    insertProductService,
    getDetailProductService,
    updateProductService,
    deleteProductService,
    listAllProductService,
    linkReviewListProductService,
    isProductIsExsited,
    size
}
