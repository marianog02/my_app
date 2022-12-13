const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

//Middlewares
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')
const cors = require('./middleware/cors')
//Routes
const user = require('./routes/user')

app.use(cors)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)
app.use("/user", user)
app.use(auth)

app.use(notFound)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})