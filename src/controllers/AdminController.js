import AdminService from '../services/admin.service.js'
/*
    Admin controller
*/
class AdminController {
    async login(req, res) {
        const { user, password } = req.body
        const admin = await AdminService.loginAdmin(user, password)
        if (admin !== null) {
            req.session.user = admin.user
            res.redirect('/')
        } else {
            res.render('login')
        }
    }

    logout(req, res) {
        AdminService.logout(req, res)
        res.redirect('/login')
    }
}

export default new AdminController()
