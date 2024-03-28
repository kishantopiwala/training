const express = require('express');
const routes = express.Router();
const bodyparser = require('body-parser');
const {jobform, submitform , showemployees,getemployeedetail,updateemployee,education_details}= require('../../controller/task10/controller')
const{authorization} = require('../../controller/controller') 
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));

routes.get('/jobform',authorization,jobform);
routes.post('/submitdetails',authorization,submitform)
routes.get('/employees',authorization,showemployees)
routes.get('/getemployeedetail/:emp_id',authorization,getemployeedetail)
routes.post('/updateemployee',authorization,updateemployee)
routes.use((req,res,next)=>{
    next()
})
module.exports = routes;