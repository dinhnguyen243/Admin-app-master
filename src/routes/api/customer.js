import CustomerModel from '../../models/CustomerModel.js'

const getUserById = async (req, res) => {
    const method = req.method

    if (method !== 'GET') {
        return req.status(405).json({
            message: 'Only GET allowed.'
        })
    }

    const { id } = req.params

    const user = await CustomerModel.findById(
        { _id: id },
        {
            __v: 0
        }
    )

    res.status(200).json(user)
}

const updateUserById = async (req, res) => {
    const method = req.method

    if (method !== 'PATCH') {
        return res.status(405).json({
            message: 'Only PATCH allowed.'
        })
    }

    const { id } = req.params

    const user = await CustomerModel.findById(
        { _id: id },
        {
            __v: 0
        }
    )

    const updateUser = await CustomerModel.findByIdAndUpdate(
        { _id: id },
        {
            address: req.body.address || user.address,
            phone: req.body.phone || user.phone,
            fullname: req.body.fullname || user.fullname,
            update_at: Date.now()
        }
    )
  
    res.status(200).json({
        message: 'Update successful'
    })
}

export default {
    getUserById,
    updateUserById
}
