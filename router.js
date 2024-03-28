const express = require('express');
const routes = express.Router()
const {home,submitform, registrationform,activationlink,activateaccount,
    setpassword, loginrender,authorization ,linkexpired, generatelink,
    login ,fprender, dynamictable, evnetstable, kukucube, tictactoe,} = require('./controller/controller')

const { webpage1, webpage2, webpage3 } = require('./controller/webpagecontroller')

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

//Dynamic Table Route 
routes.use('/dynamictable',authorization,dynamictable)

// events table route
routes.use('/eventstable',authorization,evnetstable)

// Kuku Cube Route
routes.use('/kukucube',authorization,kukucube)

// tic tac toe route
routes.use('/tictactoe',authorization,tictactoe)

// webpages routes 
routes.use('/webpage1',authorization,webpage1)
routes.use('/webpage2',authorization,webpage2)
routes.use('/webpage3',authorization,webpage3)

routes.use((req,res,next)=>{
    next()
});
module.exports  = routes;