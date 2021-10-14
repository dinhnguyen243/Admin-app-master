import productService from '../services/product.service.js'

class ProductController {
    async insertProduct(req, res) {
        const product = req.body
        await productService.insertProductService(product)
        res.redirect('/')
    }

    async getProduct(req, res) {
        const { id } = req.params
        const product = await productService.getDetailProductService(id)
        res.render('capnhatsanpham', {
            product
        })
    }

    async updateProduct(req, res) {
        const { id } = req.params
        const _product = req.body
        const product = await productService.updateProductService(id, _product)
        res.redirect('/danhsachsanpham')
    }

    async deleteProduct(req, res) {
        const { id } = req.params
        await productService.deleteProductService(id)
        res.redirect('/danhsachsanpham')
    }

    async listAllProduct(req, res) {
        const listProduct = await productService.listAllProductService()
        const size = await productService.size()
        res.render('danhsachsanpham', {
            listProduct,
            size
        })
    }

    async listAllLinkProduct(req, res) {
        const listLinkProduct =
            await productService.linkReviewListProductService()
        res.render('danhsachlink', {
            listLinkProduct
        })
    }
}

export default new ProductController()
