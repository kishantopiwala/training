const express = require('express');
const routes = express.Router();
const bodyparser = require('body-parser');
const {jobform, submitform , showemployees,getemployeedetail,updateemployee,education_details,renderemployee,updateform}= require('../../controller/task12/controller') 
const{authorization} = require('../../controller/controller')
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));

routes.get('/jobform',authorization,jobform);
routes.post('/submitdetails',authorization,submitform)
routes.get('/employees',authorization,renderemployee)
routes.get('/getemployee',authorization,showemployees)
// routes.get('/education_details',education_details)
routes.get('/updateemployeeform/:emp_id',authorization,jobform)
routes.get('/getemployeedetail/:emp_id?',authorization,getemployeedetail)
routes.post('/updateemployee',authorization,updateemployee)
routes.use((req,res,next)=>{
    next()
})
module.exports = routes;