const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const routes = express.Router()
const { home, submitform, registrationform, activationlink, activateaccount,
    setpassword, loginrender, authorization, linkexpired, generatelink,
    login, fprender, dynamictable, evnetstable, kukucube, tictactoe, } = require('./controller/controller')

const { webpage1, webpage2, webpage3 } = require('./controller/webpagecontroller')

const { studentlist, attendance, dlimitersearch, result, viewreport } = require('./controller/searchingsortingpagination/controller');

const { jobform, job_submitform, showemployees, getemployeedetail, updateemployee } = require('./controller/jobform/controller')

const { ajax_jobform,
    ajax_submitform,
    ajax_showemployees,
    ajax_getemployeedetail,
    ajax_updateemployee,
    ajax_renderemployee,} = require('./controller/ajaxjobform/controller')

const { viewposts, specificpost } = require('./controller/apicall/controller')


routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({ extended: true }));
routes.use(cookieParser())

routes.get('/login', loginrender)
routes.get('/registration', registrationform)
routes.post('/login', login)
routes.get('/home', authorization, home);
routes.get('/', loginrender);
routes.get('/activateaccount/:email', activateaccount);
routes.get('/linkexpired', linkexpired);
routes.post('/setpassword', setpassword);
routes.get('/checkactivationcode/:email?', activationlink);
routes.post('/submitdetails', submitform);
routes.get('/generatelink/:email', generatelink)
routes.get('/forgetpassword/:email', fprender)

//Dynamic Table Route 
routes.use('/dynamictable', authorization, dynamictable)

// events table route
routes.use('/eventstable', authorization, evnetstable)

// Kuku Cube Route
routes.use('/kukucube', authorization, kukucube)

// tic tac toe route
routes.use('/tictactoe', authorization, tictactoe)

// webpages routes 
routes.use('/webpage1', authorization, webpage1)
routes.use('/webpage2', authorization, webpage2)
routes.use('/webpage3', authorization, webpage3)

// Task 8 Student List ,Pagination , Sorting , Filter etc

routes.get('/studentlist', authorization, studentlist)
routes.post('/studentlist', authorization, studentlist)
routes.get('/attendance', authorization, attendance)
routes.get('/result', authorization, result)
routes.get('/viewreport/:stu_id/:stu_name', authorization, viewreport)
routes.get('/dlimitersearch', authorization, dlimitersearch)

// Task 9 Dilimiter Search 
routes.post('/dlimitersearch', authorization, dlimitersearch)

// Task 10 Job Form Without Ajax
routes.get('/jobform', authorization, jobform);
routes.post('/jobsubmitdetails', authorization, job_submitform)
routes.get('/employees', authorization, showemployees)
routes.get('/getemployeedetail/:emp_id', authorization, getemployeedetail)
routes.post('/updateemployee', authorization, updateemployee)

// Task 11 Fetch api from Json PlaceHolder

routes.get('/post', authorization, viewposts);
routes.get('/specificpost/:postid', authorization, specificpost)


// Task 12 Job From With AJAX

routes.get('/ajax/jobform', authorization, ajax_jobform);
routes.post('/ajax/submitdetails', authorization, ajax_submitform)
routes.get('/ajax/employees', authorization, ajax_renderemployee)
routes.get('/ajax/getemployee', authorization, ajax_showemployees)
routes.get('/ajax/updateemployeeform/:emp_id', authorization, ajax_jobform)
routes.get('/ajax/getemployeedetail/:emp_id?', authorization, ajax_getemployeedetail)
routes.post('/ajax/updateemployee', authorization, ajax_updateemployee)

module.exports = routes;