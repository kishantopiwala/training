const express = require('express');
const routes = express.Router();
const bodyparser = require('body-parser');
const {jobform, submitform , showemployees,getemployeedetail,updateemployee,education_details}= require('../../controller/task10/controller') 
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));

routes.get('/jobform',jobform);
routes.post('/submitdetails',submitform)
routes.get('/employees',showemployees)
routes.get('/getemployeedetail/:emp_id',getemployeedetail)
routes.post('/updateemployee',updateemployee)
routes.use((req,res,next)=>{
    next()
})
module.exports = routes;