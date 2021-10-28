import VoucherModel from '../../models/VoucherModel.js'

const listAllPVoucher = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const vouchers = await VoucherModel.find({}, { __v: 0, updated_at: 0}).sort({created_at : 'desc'})

    res.status(200).json(vouchers)
}

export default {
    listAllPVoucher
}
