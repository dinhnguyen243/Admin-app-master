import BillModel from '../models/BillModel.js'
import BillDetailModel from '../models/BillDetailModel.js'
import ProductModel from '../models/ProductModel.js'
import CustomerModel from '../models/CustomerModel.js'

class PaymentController {
    async listOrderNotDelivered(req, res) {
        const bills = await BillModel.find({ status: false })
        let confirmBill = []

        for (const bill of bills) {
            const customer = await CustomerModel.findById({
                _id: bill.customer_id
            })

            const product_id = await BillDetailModel.find(
                { bill_id: bill.bill_id },
                { product_id: 1, _id: 0 }
            )
            const product_name = []

            for (const id in product_id) {
                const nameProduct = await ProductModel.findOne(
                    { product_id: product_id[id].product_id },
                    { product_name: 1, _id: 0 }
                )
                product_name.push(nameProduct.product_name)
            }
            if(customer === null){
                continue
            }
            confirmBill.push({
                bill_id: bill.bill_id,
                fullname: customer?.fullname || 'chưa có tên',
                address: customer.address,
                product_name,
                voucher_code: bill.voucher_id,
                total_price: bill.total_price,
                quantity: bill.quantity,
                created_at: bill.created_at,
                status: bill.status
            })
        }
        res.render('xacnhanhoadon', { confirmBill })
    }

    async listOrderDelivered(req, res) {
        const bills = await BillModel.find({ status: true })
        let confirmBill = []

        for (const bill of bills) {
            const customer = await CustomerModel.findById({
                _id: bill.customer_id
            })

            const product_id = await BillDetailModel.find(
                { bill_id: bill.bill_id },
                { product_id: 1, _id: 0 }
            )
            const product_name = []

            for (const id in product_id) {
                const nameProduct = await ProductModel.findOne(
                    { product_id: product_id[id].product_id },
                    { product_name: 1, _id: 0 }
                )
                product_name.push(nameProduct.product_name)
            }

            if(customer === null){
                continue
            }
            
            confirmBill.push({
                bill_id: bill.bill_id,
                fullname: customer.fullname,
                address: customer.address,
                product_name,
                voucher_code: bill.voucher_id,
                total_price: bill.total_price,
                quantity: bill.quantity,
                created_at: bill.created_at,
                status: bill.status
            })
        }
        res.render('donhangdagiao', { confirmBill })
    }

    async delivery(req, res) {
        const { id } = req.params

        const bill = await BillModel.findOneAndUpdate(
            { bill_id: id },
            { status: true }
        )

        const a = await BillDetailModel.updateMany(
            { bill_id: id },
            { status: true }
        )

        res.redirect('/donhangdagiao')
    }

    async listProductPurchased(req, res) {
        const listPurchased = []
        const purchaseds = await BillDetailModel.find({status: true})

        for (const purchase of purchaseds) {
            const product = await ProductModel.findOne(
                { product_id: purchase.product_id },
                {
                    product_name: 1,
                    color: 1
                }
            )
                console.log(product)
            listPurchased.push({
                product_id: purchase.product_id,
                product_name: product.product_name,
                price: purchase.price,
                quantity: purchase.quantity,
                last_price: purchase.last_price,
                color: product.color,
                created_at: purchase.created_at
            })
        }

        res.render('sanphamdaban', { listPurchased })
    }
}

export default new PaymentController()
