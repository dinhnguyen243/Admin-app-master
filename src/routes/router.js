import express from 'express'
import auth from '../services/auth.js'
import AdminController from '../controllers/AdminController.js'
import ProductController from '../controllers/ProductController.js'
import VoucherController from '../controllers/VoucherController.js'
import EventController from '../controllers/EventController.js'
import CustomerController from '../controllers/CustomerController.js'
import PaymentController from '../controllers/PaymentController.js'
import routerAPI from './api/router.js'

const router = express.Router()

router.use('/api', routerAPI)

router.get('/', auth, (req, res) => {
    res.render('trangchu')
})

// login route
router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.post('/login', AdminController.login)

router.get('/logout', AdminController.logout)

// routes product
router.post('/insertProduct', ProductController.insertProduct)

router.post('/updateProduct/:id', ProductController.updateProduct)

router.get('/deleteProduct/:id', auth, ProductController.deleteProduct)

router.get('/capnhatsanpham/:id', auth, ProductController.getProduct)

router.get('/danhsachsanpham', auth, ProductController.listAllProduct)

router.get('/themsanpham', auth, (req, res) => {
    res.render('themsanpham')
})

router.post('/insertEvent', auth, EventController.insertEvent)

router.post('/updateEvent/:id', auth, EventController.updateEvent)

router.get('/deleteEvent/:id', auth, EventController.deleteEvent)

router.get('/danhsachthongbao', auth, EventController.listAllEvent)

router.get('/capnhatthongbao/:id', auth, EventController.getEvent)

router.get('/themthongbao', auth, (req, res) => {
    res.render('themthongbao')
})

router.post('/insertVoucher', auth, VoucherController.insertVoucher)

router.get('/capnhatvoucher/:id', auth, VoucherController.getVoucher)

router.post('/updateVoucher/:id', auth, VoucherController.updateVoucher)

router.get('/deleteVoucher/:id', auth, VoucherController.deleteVoucher)

router.get('/danhsachvoucher', auth, VoucherController.listAllVoucher)

router.get('/themVoucher', auth, (req, res) => {
    res.render('themvoucher')
})

router.get('/xacnhanhoadon', auth, PaymentController.listOrderNotDelivered)

router.get('/delivery/:id', auth, PaymentController.delivery)

router.get('/donhangdagiao', auth, PaymentController.listOrderDelivered)

router.get('/sanphamdaban', auth, PaymentController.listProductPurchased)

router.get('/themlink', auth, (req, res) => {
    res.render('themlink')
})

router.get('/danhsachlink', auth, ProductController.listAllLinkProduct)

router.get('/khoanguoidung', auth, (req, res) => {
    res.render('khoanguoidung')
})

router.get('/mokhoanguoidung', auth, (req, res) => {
    res.render('mokhoanguoidung')
})

router.get('/danhsachnguoidung', auth, CustomerController.listAllCustomer)

router.get('/statusAccount/:id', auth, CustomerController.setStatusCustomer)

export default router
