import AdminModel from '../models/AdminModel.js'

const loginAdmin = async (user, password) => {
    const admin = await AdminModel.findOne({ user, password })
    return admin
}

const logout = (req, res) => {
    delete req.session.user
}

export default {
    loginAdmin,
    logout
}
