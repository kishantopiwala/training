function validateform() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var errormessage = document.getElementsByClassName('errormessage');

    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phonenoregx = /^[0-9]{10}$/;
    for (const span in errormessage) {
        errormessage[span].innerHTML = '';
    }

    var validate = true;
    if (fnamereg.test(fname) == false) {
        document.getElementById('fnameerror').innerHTML = 'First Name is Empty or other than character';
        document.getElementById('fname').focus()
        validate = false
    }
    if (!fnamereg.test(lname)) {
        document.getElementById('lnameerror').innerHTML = 'Lastname Name is Empty or other than character';
        document.getElementById('lname').focus()
        validate = false
    }
    if (!emailregx.test(email)) {
        document.getElementById('emailerror').innerHTML = 'Email is Empty or other than character';
        document.getElementById('email').focus()
        validate = false
    }
    return validate;
}