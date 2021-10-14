import BillModel from '../../models/BillModel.js'
import BillDetailModel from '../../models/BillDetailModel.js'
import VoucherModel from '../../models/VoucherModel.js'
import ProductModel from '../../models/ProductModel.js'
import fnv32Auto from '../../lib/util.js'

// check product in database is exist ?
const isProductFully = async (listProduct) => {
    for (const product of listProduct) {
        const isQuantityProductExisted = await ProductModel.findOne(
            { product_id: product.product_id },
            { quantity: 1 }
        )
        if (
            Number(isQuantityProductExisted.quantity) -
                Number(product.quantity) <
                0 ||
            Number(isQuantityProductExisted.quantity) <= 0
        ) {
            return false
        }
    }
    return true
}

const order = async (req, res) => {
    if (req.method != 'POST')
        return res.status(405).json({ message: 'Method are not allowed' })

    try {
        const fnv32Id = fnv32Auto(`${Date.now()}${Math.random()}`)  // generate fnv32 auto for key
        const billCode = 'HD' + fnv32Auto(fnv32Id)
        const listProduct = req.body.listProduct
        let totalPrice = 0
        let totalQuantity = 0
        let idCustomer = ''
        let discount = {}

        const checked = await isProductFully(listProduct)

        if (!checked) {
            console.log(checked)
            return res.status(404).json({ message: 'Ko du hang' })
        }
        // list product order and add to bill //
        for (const product of listProduct) {
            // get voucher documents filtered by voucher code
            discount = await VoucherModel.findOne(
                { voucher_code: product.voucher_id || '' },
                { discount: 1, voucher_code: 1, status: 1, _id: 0 }
            )
            idCustomer = product.customer_id
            totalQuantity += Number(product.quantity)

            discount = !discount ? { discount: 0, status: true } : discount
            console.log(discount)
            if (!discount.status) {
                return res
                    .status(404)
                    .json({ message: 'Voucher are not allowed to use!!' })
            }

            const price = discount.status
                ? (product.price - (product.price * discount.discount) / 100) *
                  Number(product.quantity)
                : product.price * Number(product.quantity)

            totalPrice += price

            await BillDetailModel.create({
                ...product,
                last_price: price,
                bill_id: billCode
            })
            const _subProductQuantity = await ProductModel.findOne(
                { product_id: product.product_id },
                { quantity: 1 }
            )

            await ProductModel.findOneAndUpdate(
                { product_id: product.product_id },
                {
                    quantity:
                        Number(_subProductQuantity.quantity) -
                        Number(product.quantity)
                }
            )
        }

        const voucher_id = discount === null ? '' : discount.voucher_code

        await BillModel.create({
            bill_id: billCode,
            voucher_id,
            customer_id: idCustomer,
            quantity: totalQuantity,
            total_price: totalPrice
        })

        res.status(200).json({
            message: 'Order Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Order failed'
        })
    }
}

export default {
    order
}
