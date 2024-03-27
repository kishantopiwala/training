const express = require('express');
const routes = express.Router()
const bodyParser = require('body-parser');

// const body = expressvalidator.body;
const { studentlist ,addattendance ,attendance ,dlimitersearch,result ,viewreport} = require('../../controller/task8/controller');


routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

// routes.get('/studentlist/:pageid/:orderby',studentlist)
// routes.get('/addattendance',addattendance)
routes.get('/studentlist',studentlist)
routes.post('/studentlist',studentlist)
routes.get('/attendance',attendance)
routes.get('/result',result)
routes.get('/viewreport/:stu_id/:stu_name',viewreport)
routes.get('/dlimitersearch',dlimitersearch)
routes.post('/dlimitersearch',dlimitersearch)
routes.use((req, res, next) => {
    next()
})

module.exports = routes

