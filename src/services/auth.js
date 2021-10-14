import AdminModel from "../models/AdminModel.js"

export default async (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.redirect('login')
    }
}
