require('dotenv').config();
const express = require('express');
const router = require('./router')
const { authorization } = require('./controller/controller');
const task12routes = require('./routes/task12/router')

const app = express();
app.set('view engine', 'ejs')
// app.use('/',router,task8routes,task10routes)
app.use('/', router)
app.use('/task12', task12routes)
app.use('/public', express.static('public'))
app.listen(process.env.PORT, () => {
    console.log(`port is running on ${process.env.PORT}`)
})