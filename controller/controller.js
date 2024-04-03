const { con, asyncQuery } = require('../connection')
const jwt = require('jsonwebtoken')
const md5 = require('md5');
require('dotenv').config();

function home(req, res) {
    res.render('pages/home')
}

function evnetstable(req,res) {
    res.render('pages/eventstable')
}

function dynamictable(req,res) {
    res.render('pages/dynamictable')
}

function kukucube(req,res) {
    res.render('pages/kukucube')
}

function tictactoe(req,res) {
    res.render('pages/tictactoe')
}

function fprender(req, res) {
    res.render('pages/fp')
}

function registrationform(req, res) {
    res.render('pages/registration')
}

async function activateaccount(req, res) {
    const email = req.params.email;
    const validlink = await activationlink(email);
    if (validlink) {
        res.render('pages/activateaccount.ejs')
    } else {
        res.render('pages/linkexpired.ejs')
    }
}

async function login(req, res) {
    const useremail = req.body.username;
    let password = req.body.password;
    const checkuserquery = `select stu_password,salt,is_active from users where email = '${useremail}'`
    try {
        const result = await asyncQuery(checkuserquery)
        if (result[0].is_active == 1) {
            const salt = result[0].salt
            password = md5(password + salt)
            if (result[0].stu_password == password) {
                const token = jwt.sign({ id: useremail }, process.env.JWT_SECRET_KEY, { expiresIn: 84000 })
                res.cookie("token", token)
                res.send({
                    status: 200,
                    msg: "Login Successfully",
                    token: token
                })
            }
            else {
                res.send({
                    status: 401,
                    msg: "Username or Password invalid"
                })
            }
        }
        else {
            res.send({
                status: 401,
                msg: "Username or Password invalid"
            })
        }
    } catch (error) {
        throw error
    }
}

function loginrender(req, res) {
    res.render('pages/login')
}
function linkexpired(req, res) {
    res.render('pages/linkexpired')
}

async function generatelink(req, res) {
    const email = req.params.email;
    var activationcode = await activationcodegenerator()
    var update_student = `update users set activation_code = ?,updated_at=current_timestamp() where email = ?`
    con.query(update_student, [`${activationcode}`, `${email}`], (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send({
                status: 200,
                msg: "link generated",
                email: email
            })
        }
    })
}

async function activationlink(email) {
    try {
        const selectactivationcode = `select email,activation_code,updated_at as created_at from users where email = '${email}'`
        const result = await asyncQuery(selectactivationcode);
        if (result.length) {
            var time = Date.now()
            time = Math.floor(time / 1000)
            var created_at = new Date(result[0].created_at)
            created_at = Math.floor(created_at.getTime() / 1000)
            var difference = Math.floor((time - created_at) / 60)
            if (difference < 1) {
                return true;
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}

async function submitform(req, res) {
    const { fname, lname, email, phoneno } = req.body

    var activationcode = await activationcodegenerator()
    var insert_student = `insert into users(firstname,lastname,email,phoneno,activation_code)
    values(?,?,?,?,?)`;
    // let lastindex = await basic_details()
    function basic_details() {
        return new Promise((resolve, reject) => {
            con.query(insert_student, [`${fname}`, `${lname}`, `${email}`, `${phoneno}`, `${activationcode}`], (error, result) => {
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                else {
                    return resolve(result.insertId)
                    console.log('Basic Details Added')
                }
            })
        })
    }
    basic_details()
        .then((lastindex) => {
            lastinsertedid = lastindex
            res.send({
                status: 200,
                msg: `Student Registered`,
                email: email
            })
        })
        .catch((error) => {
            console.log(error)
            res.send({
                status: 400,
                msg: `Student not added`
            })
        })
}

function activationcodegenerator() {
    return new Promise((resolve) => {
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 10) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return resolve(result)
    })
}

function saltgenerator() {
    return new Promise((resolve) => {
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 4) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return resolve(result)
    })
}

async function setpassword(req, res) {
    const { pass, email } = req.body
    var salt = await saltgenerator()
    const encodedpassword = md5(pass + salt)
    var set_password = `update users set stu_password=?,is_active=? ,salt=? where email = ?`;
    function insertpassword() {
        return new Promise((resolve, reject) => {
            con.query(set_password, [`${encodedpassword}`, 1, `${salt}`, `${email}`], (error, result) => {
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                else {
                    return resolve(result.insertId)
                    console.log('Basic Details Added')
                }
            })
        })
    }
    insertpassword()
        .then((lastindex) => {
            lastinsertedid = lastindex
            res.send({
                status: 200,
                msg: `Password Set`
            });
        })
        .catch((error) => {
            console.log(error)
            res.send({
                status: 400,
                msg: `Password Not Set`
            });
        })
}

async function authorization(req, res, next) {
    try {
        const clienttoken = req.cookies.token
        const verifytoken = jwt.verify(clienttoken, process.env.JWT_SECRET_KEY)
        const select = `select id,email from users where email = '${verifytoken.id}'`
        const result = await asyncQuery(select);
        if (result.length) {
            next()
        }
        else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }

}
module.exports = { home, submitform, registrationform, activationlink, activateaccount,
     authorization, setpassword, loginrender, linkexpired, generatelink, 
     login, fprender,dynamictable,evnetstable,kukucube,tictactoe }