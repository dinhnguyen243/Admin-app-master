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
import productService from '../../services/product.service.js'

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

router.post('/upload', (req, res) => {
    
    const arrProductXlxs = req.body
    console.log(arrProductXlxs)
   arrProductXlxs.forEach(async product => {
      await productService.insertProductService(null,{
           product_id: product[0],
           product_name: product[1],
           brand: product[2],
           ram: product[3],
           hard_disk: product[4],
           cpu: product[5],
           core: product[6],
           color: product[7],
           monitor: product[8],
           size: product[9],
           os: product[10],
           vga: product[11],
           price_income: product[12],
           price_outcome: product[13],
           quantity: product[14],
           link_review: product[15],
       })
   })
   
   res.json({mess: 'ok'})
})

export default router
