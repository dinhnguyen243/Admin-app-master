import customerService from '../services/customer.service.js'

/*
    Customer controller
*/

class CustomerController {
    async listAllCustomer(req, res) {
        const listCustomers = await customerService.listAllCustomerService()
        res.render('danhsachnguoidung', {
            listCustomers
        })
    }

    async setStatusCustomer(req, res){
        const {id} = req.params
        const {status} = req.query
        await customerService.statusAccountService(id, status)
        res.redirect('/danhsachnguoidung')
    }
}

export default new CustomerController()
