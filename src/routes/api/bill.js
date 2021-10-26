import BillModel from '../../models/BillModel.js'
import BillDetailModel from '../../models/BillDetailModel.js'

const getBillByCustomerId = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const { id } = req.params

    const bills = await BillModel.find(
        {
            customer_id: id
        },
        { __v: 0 }
    )

    res.status(200).json(bills)
}

const getBillDetailByBillId = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const { id } = req.params

    const billDetail = await BillDetailModel.find(
        {
            bill_id: id
        },
        { __v: 0 }
    )
    res.status(200).json(billDetail)
}

export default {
    getBillByCustomerId,
    getBillDetailByBillId
}
