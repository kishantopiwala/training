const express = require('express');
const routes =  express.Router();
const bodyparser = require('body-parser');
const {viewposts , specificpost} = require('../../controller/task11/controller')
const{authorization} = require('../../controller/controller')
routes.use(bodyparser.json());
routes.use(bodyparser.urlencoded({extended:true}));

routes.get('/post',authorization,viewposts);
routes.get('/specificpost/:postid',authorization,specificpost)

routes.use((req,res,next)=>{
    next()
});


module.exports = routes;