function validateform() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    // var designation = document.getElementById('designation').value;
    // var add1 = document.getElementById('add1').value;
    // var add2 = document.getElementById('add2').value;
    var email = document.getElementById('email').value;
    // var state = document.getElementById('state').value;
    // var phoneno = document.getElementById('phoneno').value;
    // var city = document.getElementById('city').value;
    // var male = document.getElementById('male');
    // var female = document.getElementById('female');
    // var pincode = document.getElementById('pincode').value;
    // var relation_status = document.getElementById('relation_status').value;
    // var dob = document.getElementById('dob').value;
    var errormessage = document.getElementsByClassName('errormessage');

    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phonenoregx = /^[0-9]{10}$/;
    var pincoderegx = /^[0-9]{6}$/;
    var dateregx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
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
    // if (!emptyreg.test(designation)) {
    //     document.getElementById('designationerror').innerHTML = 'Designation is Empty';
    //     document.getElementById('designation').focus()
    //     validate = false
    // }
    // if (add1 == "") {
    //     document.getElementById('add1error').innerHTML = 'Address is Empty';
    //     document.getElementById('add1').focus()
    //     validate = false
    // }
    if (!emailregx.test(email)) {
        document.getElementById('emailerror').innerHTML = 'Email is Empty or other than character';
        document.getElementById('email').focus()
        validate = false
    }
    // if (state == "") {
    //     document.getElementById('stateerror').innerHTML = 'Select State';
    //     document.getElementById('state').focus()
    //     validate = false
    // }
    // if (!fnamereg.test(city)) {
    //     document.getElementById('cityerror').innerHTML = 'City is Empty or other than character'
    //     document.getElementById('city').focus()
    //     validate = false
    // }
    // if (!phonenoregx.test(phoneno)) {
    //     document.getElementById('phonenoerror').innerHTML = 'empty Phone number should be 10 digit only'
    //     document.getElementById('phoneno').focus()
    //     validate = false
    // }

    // if (!pincoderegx.test(pincode)) {
    //     document.getElementById('pincodeerror').innerHTML = 'empty pincode should be 6 digit only'
    //     document.getElementById('pincode').focus()
    //     validate = false
    // }
    // if (!dateregx.test(dob)) {
    //     document.getElementById('doberror').innerHTML = 'dob is empty or in invalid format'
    //     document.getElementById('dob').focus()
    //     validate = false
    // }
    // if (male.checked == false && female.checked == false) {
    //     document.getElementById('gendererror').innerHTML = 'Select Gender'
    //     validate = false
    //     if (male.checked == true && female.checked == false || male.checked == false && female.checked == true) {
    //         document.getElementById('gendererror').innerHTML = ''
    //         validate = true;
    //     }
    // }
    // else {
    //     document.getElementById('gendererror').innerHTML = ''
    // }
    
    return validate;
}