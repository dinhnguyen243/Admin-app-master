import CustomerModel from '../../models/CustomerModel.js'

export default async (req, res) => {
    const customer = req.body
    const isExisted = await CustomerModel.exists({
        user: customer.user
    })

    if (!isExisted) {
        await CustomerModel.create(customer)
        res.status(200).json({ message: 'Created successfully' })
    } else {
        res.status(400).json({ message: 'Account is existed' })
    }
}
