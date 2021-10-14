import VoucherModel from '../models/VoucherModel.js'

const insertVoucherService = async (voucher) => {
    let _docsVoucher = {}
    if (!(await isVoucherIsExsited(voucher.voucher_code.toLowerCase()))) {
        _docsVoucher = await VoucherModel.create({
            ...voucher,
            voucher_code: voucher.voucher_code.toLowerCase()
        })
    } else {
        _docsVoucher = await VoucherModel.findOneAndUpdate(
            { voucher_code: voucher.voucher_code.toLowerCase() },
            {
                ...voucher,
                voucher_code: voucher.voucher_code.toLowerCase(),
                updated_at: Date.now()
            }
        )
    }

    return _docsVoucher
}

const isVoucherIsExsited = async (id) => {
    const _voucher = await VoucherModel.exists({ voucher_code: id })
    return _voucher ? true : false
}

const getDetailVoucherService = async (id) => {
    const _docVoucher = await VoucherModel.findById(id)
    return _docVoucher
}

const updateVoucherService = async (id, voucher) => {
    const _docVoucher = await VoucherModel.findByIdAndUpdate(id, {
        ...voucher,
        updated_at: Date.now()
    })
    return _docVoucher
}

const deleteVoucherService = async (id) => {
    const _docVoucher = await VoucherModel.findByIdAndDelete(id)
    return _docVoucher
}

const listAllVoucherService = async () => {
    const _allVouchers = await VoucherModel.find({})
    return _allVouchers
}

const size = async () => {
    const _size = await VoucherModel.countDocuments({})
    return _size
}

export default {
    insertVoucherService,
    getDetailVoucherService,
    updateVoucherService,
    deleteVoucherService,
    listAllVoucherService,
    size
}
