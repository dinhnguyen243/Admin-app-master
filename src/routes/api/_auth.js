import CustomerModel from '../../models/CustomerModel.js'

export default async (req) => {
    const { headers } = req

    if (typeof headers === 'object') {
        const { authorization } = headers

        if (typeof authorization === 'string') {
            const base64 = authorization.split(' ')[1] || ''

            const [id, pass] = Buffer.from(base64, 'base64')
                .toString()
                .split(':')

            if (id && pass) {
                const user = await CustomerModel.findOne(
                    {
                        user: id,
                        password: pass
                    },
                    {
                        user: 1,
                        password: 1,
                        fullname: 1,
                        address: 1,
                        email: 1,
                        phone: 1,
                        status: 1
                    }
                )

                if (user) {
                    return user
                }
            }
        }
    }
    return null
}
