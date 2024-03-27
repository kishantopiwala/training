const mysql2 = require('mysql2');
const {promisify} = require("util")
require('dotenv').config();
var con =  mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.user,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
const asyncQuery = promisify(con.query).bind(con);
module.exports = {con, asyncQuery}



// functions: bind, apply, call