const express = require('express');
const routes = express.Router()
const bodyParser = require('body-parser');

// const body = expressvalidator.body;

const { studentlist ,addattendance ,attendance ,dlimitersearch,result ,viewreport} = require('../../controller/task8/controller');
const{authorization} = require('../../controller/controller')

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

// routes.get('/studentlist/:pageid/:orderby',studentlist)
// routes.get('/addattendance',addattendance)
routes.get('/studentlist',authorization,studentlist)
routes.post('/studentlist',authorization,studentlist)
routes.get('/attendance',authorization,attendance)
routes.get('/result',authorization,result)
routes.get('/viewreport/:stu_id/:stu_name',authorization,viewreport)
routes.get('/dlimitersearch',authorization,dlimitersearch)
routes.post('/dlimitersearch',authorization,dlimitersearch)
routes.use((req, res, next) => {
    next()
})

module.exports = routes

