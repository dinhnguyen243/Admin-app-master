import sgMail from '@sendgrid/mail'
import CustomerModel from '../../models/CustomerModel.js'

const API_KEY = `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`

sgMail.setApiKey(API_KEY)

const sendEmail = async (req, res) => {
    try {
        const reqEmail = req.body.reqEmail

        if (!reqEmail)
            return res.status(401).send({
                message: 'Missed email'
            })

        const checkIsExistedEmail = await CustomerModel.exists({
            email: reqEmail
        })

        if (!checkIsExistedEmail) {
            return res.status(401).send({
                message: 'Email not found'
            })
        }
        const msg = {
            to: reqEmail, // Change to your recipient
            from: 'filept3000@gmail.com', // Change to your verified sender
            subject: 'Đặt hàng thành công',
            html: `<h3>Cảm ơn đã đặt sản phẩm bên chúng tôi, chúng tôi sẽ giao sản phẩm trong thời gian sớm nhất! <h3>
            <strong>Đây là mail tự động, vui lòng không phản hồi lại!</strong>`
        }

        sgMail
            .send(msg)
            .then((data) => {
                console.log(data)
                res.status(200).json({
                    message: 'Successfully.'
                })
            })
            .catch((e) => {
                console.log(e)
            })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Error'
        })
    }
}

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            await sendEmail(req, res)
        } else {
            res.status(404).json({
                message: 'Method are not allowed.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Bad request.'
        })
    }
}
