import ProductModel from '../models/ProductModel.js'
import fs from 'fs'
import fnv32Auto from '../lib/util.js'

const insertProductService = async (arrayImage, product) => {
    let _docsProduct = {}

    if(!!arrayImage){    
    product.img = arrayImage.map(img => {
        const fnv32Id = fnv32Auto(`${Date.now()}${Math.random()}`)  // generate fnv32 auto for key
        const hashNameImg =  fnv32Auto(fnv32Id) + '-' +img

        fs.renameSync('./public/img/' + img, './public/img/'+hashNameImg)

        return hashNameImg
    })

    console.log(product.img)
    }

    product.link_review = product.link_review.split(',')
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
    _docsProduct.link_review = _docsProduct.link_review.join(',')

    return _docsProduct
}

const updateProductService = async (id, product, arrayImage) => {

    console.log(arrayImage)

   try {
    if(arrayImage.length){
        if(!!product.old_image){
            product.old_image.forEach(img => {
                fs.unlinkSync('./public/img/' + img)
            })
           }

        
    }
   } catch (error) {
       console.log(error)
   }

  if(arrayImage.length){
    product.img = arrayImage.map(img => {
        const fnv32Id = fnv32Auto(`${Date.now()}${Math.random()}`)  // generate fnv32 auto for key
        const hashNameImg =  fnv32Auto(fnv32Id) + '-' + img

        fs.renameSync('./public/img/' + img, './public/img/'+hashNameImg)

        return hashNameImg
    })
  }

    //product.img = product.img.split(',\r\n')
    product.link_review = product.link_review.split(',')
  
 
    const _docsProduct = await ProductModel.findByIdAndUpdate(id, {
        ...product,
        updated_at: Date.now()
    })
    return _docsProduct
}

const deleteProductService = async (id) => {

    const _docsProduct = await ProductModel.findByIdAndDelete(id)
    _docsProduct.img.forEach(img => {
        fs.unlinkSync('./public/img/' + img)
    })
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
