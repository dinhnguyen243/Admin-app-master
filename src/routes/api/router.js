import express from 'express'
import register from './register.js'
import payment from './order.js'
import product from './product.js'
import voucher from './voucher.js'
import bill from './bill.js'
import login from './login.js'
import _auth from './_auth.js'
import event from './event.js'
import customer from './customer.js'
import emailsender from './emailsender.js'

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/order', payment.order)

router.get('/product', product.listAllProduct)

router.get('/newproduct', product.listNewProduct)

router.get('/product/:id', product.getProductDetail)

router.get('/voucher', voucher.listAllPVoucher)

router.get('/event', event.listAllEvent)

router.get('/bill/:id', bill.getBillByCustomerId)

router.get('/billDetail/:id', bill.getBillDetailByBillId)

router.get('/user/:id',customer.getUserById)

router.patch('/user/:id',customer.updateUserById)

router.post('/emailsender',emailsender)

export default router
