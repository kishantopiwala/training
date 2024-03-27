require('dotenv').config();
const express = require('express');
const router = require('./router')
const app = express();
app.set('view engine', 'ejs')
app.use('/', router)
app.use('/public',express.static('public'))
app.listen(process.env.PORT, () => {
    console.log(`port is running on ${process.env.PORT}`)
})