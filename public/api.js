url = window.location.href;
const form = document.getElementById('form')
if (form) {

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(form)
        const data = new URLSearchParams(formdata).toString()
        submitdata(data)
    })
}
const loginform = document.getElementById('loginform');
if (loginform) {
    loginform.addEventListener('submit',function (event) {
        event.preventDefault();
        const formdata = new FormData(loginform)
        const data = new URLSearchParams(formdata).toString()
        login();
    })   
}
async function login() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const success = document.getElementById('success')
    var result = {};
    result['username'] = username;
    result['password'] = password;
    const sigin = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            "content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(result)
    })
    const response = await sigin.json()
    if (response.status == 200) {
        success.innerHTML = response.msg
        // window.localStorage.setItem('token',response.token)
        // const home = await fetch('http://localhost:8080/home')
        window.location.href = "http://localhost:8080/home"
    }
    else{
        success.innerHTML = response.msg
    }
}

const passwordform = document.getElementById('passwordform')
if (passwordform) {
    passwordform.addEventListener('submit', function (event) {
        console.log("send Password")
        event.preventDefault();
        const formdata = new FormData(passwordform)
        const data = new URLSearchParams(formdata).toString()
        setpassword()
    })
}
async function generatelink() {
    var urlparam = window.location.pathname
    urlparam = urlparam.slice(urlparam.lastIndexOf('/') + 1)
    const response = await fetch(`http://localhost:8080/generatelink/${urlparam}`);
    const responsedata = await response.json()
    if (responsedata.status == 200) {
        var a = document.createElement('a')
        a.setAttribute('href',`/activateaccount/${responsedata.email}`)
        a.innerHTML = `/activateaccount/${responsedata.email}`
        document.getElementById('body').appendChild(a)

    } else {
        console.log("Error in generating link")
    }
}
async function setpassword() {
    var urlparam = window.location.pathname
    urlparam = urlparam.slice(urlparam.lastIndexOf('/') + 1)
    // console.log(urlparam)
    var result = {}
    var pass = document.getElementById('pass').value
    result['pass'] = pass;
    result['email'] = urlparam;
    const response = await fetch(`http://localhost:8080/setpassword`, {
        method: 'POST',
        headers: {
            "content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(result)
    })
    var responsedata = await response.json();
    if (responsedata.status == 200) {
        window.location.replace('http://localhost:8080/login')
    }
}
async function submitdata(data) {
    if (validateform() == true) {

        const response = await fetch('http://localhost:8080/submitdetails', {
            method: 'POST',
            headers: {
                "content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/x-www-form-urlencoded"
            },
            body: data
        })
        const responsedata = await response.json()
        if (responsedata.status == 200) {
            console.log("Call activation Function")
            // const response = await fetch('http://localhost:8080/checkactivationcode')
            // const activationlink = await response.json();
            var a = document.createElement('a')
            a.setAttribute('href', `/activateaccount/${responsedata.email}`)
            a.innerHTML = `/activateaccount/${responsedata.email}`
            document.getElementById('body').appendChild(a)
        }
    }

}

