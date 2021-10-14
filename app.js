import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/router.js'
import path from 'path'
import db from './src/config/db.config.js'
import session from 'express-session'

const __dirname = path.resolve()
dotenv.config({ path: __dirname + '/.env' })
const app = express()
const PORT = process.env.PORT || 3000

db.connect()
app.use(
    session({
        secret: 'secret-key',
        saveUninitialized: false,
        resave: false
    })
)
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)
app.use('/public', express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
