const express = require('express');
const routes = express.Router()
const {home,submitform, registrationform,activationlink,activateaccount,setpassword, loginrender,authorization ,linkexpired, generatelink,login ,fprender} = require('./controller/controller')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));
routes.use(cookieParser())
routes.get('/login',loginrender)
routes.get('/registration',registrationform)
routes.post('/login',login)
routes.get('/home',authorization,home);
routes.get('/',loginrender);
routes.get('/activateaccount/:email',activateaccount);
routes.get('/linkexpired',linkexpired);
routes.post('/setpassword',setpassword);
routes.get('/checkactivationcode/:email?',activationlink);
routes.post('/submitdetails',submitform);
routes.get('/generatelink/:email',generatelink)
routes.get('/forgetpassword/:email',fprender)
routes.use((req,res,next)=>{
    next()
});
module.exports  = routes;