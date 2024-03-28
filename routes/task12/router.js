const express = require('express');
const routes = express.Router();
const bodyparser = require('body-parser');
const {jobform, submitform , showemployees,getemployeedetail,updateemployee,education_details,renderemployee,updateform}= require('../../controller/task12/controller') 
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));

routes.get('/jobform',jobform);
routes.post('/submitdetails',submitform)
routes.get('/employees',renderemployee)
routes.get('/getemployee',showemployees)
// routes.get('/education_details',education_details)
routes.get('/updateemployeeform/:emp_id',jobform)
routes.get('/getemployeedetail/:emp_id?',getemployeedetail)
routes.post('/updateemployee',updateemployee)
routes.use((req,res,next)=>{
    next()
})
module.exports = routes;