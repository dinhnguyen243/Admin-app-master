import voucherService from '../services/voucher.service.js'

class VoucherController {
    async insertVoucher(req, res) {
        const voucher = req.body
        await voucherService.insertVoucherService(voucher)
        res.redirect('/danhsachvoucher')
    }

    async getVoucher(req, res) {
        const { id } = req.params
        const voucher = await voucherService.getDetailVoucherService(id)
        res.render('capnhatvoucher', {
            voucher
        })
    }

    async updateVoucher(req, res) {
        const { id } = req.params
        const _voucher = req.body
        const voucher = await voucherService.updateVoucherService(id, _voucher)
        res.redirect('/danhsachvoucher')
    }

    async deleteVoucher(req, res) {
        const { id } = req.params
        await voucherService.deleteVoucherService(id)
        res.redirect('/danhsachvoucher')
    }

    async listAllVoucher(req, res) {
        const listVoucher = await voucherService.listAllVoucherService()
        res.render('danhsachvoucher', {
            listVoucher
        })
    }
}

export default new VoucherController()
