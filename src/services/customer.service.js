import CustomerModel from '../models/CustomerModel.js'

const listAllCustomerService = async (user, password) => {
    const _users = await CustomerModel.find({})
    return _users
}

const statusAccountService = async (id, status) => {
    await CustomerModel.findOneAndUpdate({ _id: id }, { status })
}

export default {
    listAllCustomerService,
    statusAccountService
}
