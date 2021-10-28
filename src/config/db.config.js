import mongoose from 'mongoose'
import dotenv from 'dotenv'
// connnect mongodb to server
dotenv.config()
const USER_MONGO = process.env.user
const KEY_MONGO = process.env.password
const CONNECT_URL = `mongodb+srv://${USER_MONGO}:${KEY_MONGO}@cluster0.5m6ec.mongodb.net/laptopstore?retryWrites=true&w=majority&ssl=true`

const connect = async () => {
    try {
        await mongoose.connect(CONNECT_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        mongoose.set('useFindAndModify', false)

        console.log('Connect successfully!!!!!')
    } catch (error) {
        console.log(error)
    }
}

export default { connect }
