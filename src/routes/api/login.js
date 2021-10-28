import _auth from './_auth.js'
import { OAuth2Client } from 'google-auth-library'
import CustomerModel from '../../models/CustomerModel.js'
import fetch from 'node-fetch'
const CLIENT_ID_1 =
    '531065278990-6ojukku9l0dfda4e7854h7ouaprd1ait.apps.googleusercontent.com'
const CLIENT_ID_2 =
    '1001584235600-8f2st7tmj2oadn4vst1g1qp9ubirt6c5.apps.googleusercontent.com'

const client = new OAuth2Client()

export default async (req, res) => {
    const method = req.method
    const id_token = req.body.id_token

    if (method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        })
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: [CLIENT_ID_1, CLIENT_ID_2]
        })

        const payload = ticket.getPayload()
        const userid = payload['sub']
        // If request specified a G Suite domain:
        // const domain = payload['hd'];

        fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`, {
            method: 'post'
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data !== null) {
                    console.log(data)
                    const user = await CustomerModel.findOne(
                        {
                            email: data.email
                        },
                        { __v: 0 }
                    )

                    if (!user) {
                        user = await CustomerModel.create({
                            user: data.email.split('@')[0],
                            fullname: data.name,
                            email: data.email
                        })
                    }

                    return res.status(200).json({
                        message: 'Login Success',
                        user
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(403).json({
                    message: 'Login Failed'
                })
            })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Error.'
        })
    }
}
