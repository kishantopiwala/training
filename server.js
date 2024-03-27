require('dotenv').config();
const express = require('express');
const router = require('./router')
const task8routes   = require('./routes/task8/route')
const app = express();
app.set('view engine', 'ejs')
app.use('/', router,task8routes)
app.use('/public',express.static('public'))
app.listen(process.env.PORT, () => {
    console.log(`port is running on ${process.env.PORT}`)
})