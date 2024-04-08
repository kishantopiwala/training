const emptyreg = /^\S+$/;
const percentageregx = /^[0-9]{1,3}$/;
const year = /^(19|20)\d{2}$/
const fnamereg = /^[a-zA-Z]+$/;
const dateregx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
const namereg = /^[a-zA-Z]+$/;
const phonenoregx = /^[0-9]{10}$/;
const noticeperiodregx = /^[0-9]{1,2}$/;
const salaryregx = /^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/
const pincoderegx = /^[0-9]{6}$/;
const emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let validate = true;

function ajaxsscvalidation() {
    const ssc = document.getElementById('ssc').value;
    const sscpassingyear = document.getElementById('sscpassingyear').value;
    const sscpercentage = document.getElementById('sscpercentage').value;
    console.log(ssc)
    if (ssc != '' || sscpassingyear != '' || sscpercentage != '') {
        if (!namereg.test(ssc)) {
            document.getElementById('sscerror').innerHTML = 'ssc is Empty or should not contain space'
            document.getElementById('ssc').focus()
            validate = false;
        }
        if (!year.test(sscpassingyear)) {
            document.getElementById('sscpassingyearerror').innerHTML = 'ssc Passing Year is Empty or it should be only 4 digit number under 2099';
            document.getElementById('sscpassingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(sscpercentage)) {
            document.getElementById('sscpercentageerror').innerHTML = 'ssc Percentage is Empty or upto three digit number only'
            document.getElementById('sscpercentage').focus()
            validate = false;
        }
    }
}

function ajaxhscvalidation() {
    const hsc = document.getElementById('hsc').value;
    const hscpassingyear = document.getElementById('hscpassingyear').value;
    const hscpercentage = document.getElementById('hscpercentage').value;

    if (hsc != '' || hscpassingyear != '' || hscpercentage != '') {
        if (!emptyreg.test(hsc)) {
            document.getElementById('hscerror').innerHTML = 'hsc is Empty'
            document.getElementById('hsc').focus()
            validate = false;
        }
        if (!year.test(hscpassingyear)) {
            document.getElementById('hscpassingyearerror').innerHTML = 'hsc Passing Year is Empty or it should be only 4 digit number under 2099';
            document.getElementById('hscpassingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(hscpercentage)) {
            document.getElementById('hscpercentageerror').innerHTML = 'hsc Percentage is Empty or upto three digit number only'
            document.getElementById('hscpercentage').focus()
            validate = false;
        }
    }
}

function ajaxbechlorevalidation() {
    const b_course_name = document.getElementById('b_course_name').value;
    const b_passingyear = document.getElementById('b_passingyear').value;
    const b_percentage = document.getElementById('b_percentage').value;
    if (b_course_name != '' || b_passingyear != '' || b_percentage != '') {
        if (!emptyreg.test(b_course_name)) {
            document.getElementById('b_course_name').focus()
            document.getElementById('b_course_nameerror').innerHTML = 'Course name is Empty'
            validate = false;
        }
        if (!year.test(b_passingyear)) {
            document.getElementById('b_passingyearerror').innerHTML = 'bechlor Passing Year is Empty or it should be only 4 digit number under 2099';
            document.getElementById('b_passingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(b_percentage)) {
            document.getElementById('b_percentageerror').innerHTML = 'bechlor Percentage is Empty or upto three digit number only'
            document.getElementById('b_percentage').focus()
            validate = false;
        }
    }
}

function ajaxmastervalidation() {
    const m_course_name = document.getElementById('m_course_name').value;
    const m_passingyear = document.getElementById('m_passingyear').value;
    const m_percentage = document.getElementById('m_percentage').value;
    if (m_course_name != '' || m_passingyear != '' || m_percentage != '') {

        if (!emptyreg.test(m_course_name)) {
            document.getElementById('m_course_name').focus()
            document.getElementById('m_course_nameerror').innerHTML = 'Course name is Empty'
            validate = false;
        }
        if (!year.test(m_passingyear)) {
            document.getElementById('m_passingyearerror').innerHTML = 'Master Passing Year is Empty or it should be only 4 digit number under 2099';
            document.getElementById('m_passingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(m_percentage)) {
            document.getElementById('m_percentageerror').innerHTML = 'Percentage is Empty or upto three digit number only'
            document.getElementById('m_percentage').focus()
            validate = false;
        }
    }
}

function ajaxcompanyvalidation(compnayname, designaion, fromdate, todate) {
    const compnaynameerror = compnayname.id + "error";
    const desiganigationerror = designaion.id + "error"
    const fromdateerror = fromdate.id + "error";
    const todateerror = todate.id + "error";

    if (compnayname.value != '' || designaion.value != '' || fromdate.value != '' || todate.value != '') {

        if (!fnamereg.test(compnayname.value)) {
            document.getElementById(compnaynameerror).innerHTML = 'Company name is Empty';
            validate = false;
        }
        if (!fnamereg.test(designaion.value)) {
            document.getElementById(desiganigationerror).innerHTML = 'Designation is Empty or invalid';
            validate = false;
        }

        if (!dateregx.test(fromdate.value)) {
            document.getElementById(fromdateerror).innerHTML = 'Enter valid date';
            validate = false;
        }
        if (!dateregx.test(todate.value)) {
            document.getElementById(todateerror).innerHTML = 'Enter valid date';
            validate = false;
        }

    }
    return validate
}

function ajaxlanguageandabality() {
    let language1 = document.getElementById('language1');
    let language2 = document.getElementById('language2');
    let language3 = document.getElementById('language3');
    let technology1 = document.getElementById('technology1');
    let technology2 = document.getElementById('technology2');
    let technology3 = document.getElementById('technology3');
    let technology4 = document.getElementById('technology4');
    let languag1ability1 = document.getElementsByClassName('languageability1')
    let languageability2 = document.getElementsByClassName('languageability2')
    let languageability3 = document.getElementsByClassName('languageability3')
    let technologyability1 = document.getElementsByClassName('technologyability1')
    let technologyability2 = document.getElementsByClassName('technologyability2')
    let technologyability3 = document.getElementsByClassName('technologyability3')
    let technologyability4 = document.getElementsByClassName('technologyability4')

    if (!technology1.checked) {
        disablebutton(technology1, technologyability1)
    }
    else {
        enablebutton(technology1, technologyability1)
    }

    if (!technology2.checked) {
        disablebutton(technology2, technologyability2)
    }
    else {
        enablebutton(technology2, technologyability2)
    }
    if (!technology3.checked) {
        disablebutton(technology3, technologyability3)
    }
    else {
        enablebutton(technology3, technologyability3)
    }

    if (!technology4.checked) {
        disablebutton(technology4, technologyability4)
    }
    else {
        enablebutton(technology4, technologyability4)
    }


    if (!language1.checked) {
        disablebutton(language1, languag1ability1)
    }
    else {
        enablebutton(language1, languag1ability1)
    }
    if (!language2.checked) {
        disablebutton(language2, languageability2)

    }
    else {
        enablebutton(language2, languageability2)
    }
    if (!language3.checked) {
        disablebutton(language3, languageability3)

    }
    else {
        enablebutton(language3, languageability3)
    }
}

function disablebutton(language, ability) {
    for (i in ability) {
        ability[i].disabled = true
    }
}

function enablebutton(language, ability) {
    for (i in ability) {
        ability[i].disabled = false
    }
}

function ajaxreferencevalidation(name, r_number, relation) {
    const reference_nameerror = name.id + "error";
    const reference_contacterror = r_number.id + "error"
    const reference_relationerror = relation.id + "error";
    if (name.value != '' || r_number.value != '' || relation.value != '') {

        if (!namereg.test(name.value)) {
            name.focus()
            document.getElementById(reference_nameerror).innerHTML = ' name should not contain white space or special character or number';
            validate = false;
        }
        if (!phonenoregx.test(r_number.value)) {
            document.getElementById(reference_contacterror).innerHTML = 'Contact is empty it should be 10 digit only';
            validate = false;
        }

        if (!namereg.test(relation.value)) {
            document.getElementById(reference_relationerror).innerHTML = 'Relation should not contain white space or special character or number';
            validate = false;
        }
    }
    return validate
}

function ajaxpreferencevalidation() {

    const p_location = document.getElementById('p_location');
    const notice_period = document.getElementById('notice_period')
    const expacted_ctc = document.getElementById('expacted_ctc')
    const current_ctc = document.getElementById('current_ctc')
    const p_department = document.getElementById('p_department')
    console.log(p_location.value)
    if (p_location.value == '') {
        p_location.focus()
        document.getElementById('p_locationerror').innerHTML = 'select Location';
        validate = false;
    }

    if (!noticeperiodregx.test(notice_period.value)) {
        notice_period.focus();
        document.getElementById('notice_perioderror').innerHTML = 'Notice Period is Empty or only number up 1-12';
        validate = false;
    }

    if (!salaryregx.test(expacted_ctc.value)) {
        document.getElementById('expacted_ctcerror').innerHTML = 'Expacted CTC is Empty or invalid';
        validate = false;
    }

    if (!salaryregx.test(current_ctc.value)) {
        document.getElementById('current_ctcerror').innerHTML = 'Current CTC is Empty or invalid';
        validate = false;
    }
    if (!namereg.test(p_department.value)) {
        p_department.focus()
        document.getElementById('p_departmenterror').innerHTML = 'select Department';
        validate = false;
    }
}

function ajaxvalidateform() {
    validate = true
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const designation = document.getElementById('designation').value;
    const add1 = document.getElementById('add1').value;
    const add2 = document.getElementById('add2').value;
    const email = document.getElementById('email').value;
    const state = document.getElementById('state').value;
    const phoneno = document.getElementById('phoneno').value;
    const city = document.getElementById('city').value;
    const male = document.getElementById('male');
    const female = document.getElementById('female');
    const pincode = document.getElementById('pincode').value;
    const relation_status = document.getElementById('relation_status').value;
    const dob = document.getElementById('dob').value;
    const errormessage = document.getElementsByClassName('errormessage');

    let company = document.getElementsByClassName('company');
    let workdesignation = document.getElementsByName('workdesignation');
    let fromdate = document.getElementsByClassName('fromdate');
    let todate = document.getElementsByClassName('todate');

    let reference_name = document.getElementsByClassName('reference_name');
    let reference_contact = document.getElementsByClassName('reference_contact');
    let reference_relation = document.getElementsByClassName('reference_relation');

    let language1 = document.getElementById('language1');
    let language2 = document.getElementById('language2')
    let language3 = document.getElementById('language3')
    let technology1 = document.getElementById('technology1')
    let technology2 = document.getElementById('technology2')
    let technology3 = document.getElementById('technology3')
    let technology4 = document.getElementById('technology4')

    for (const span in errormessage) {
        errormessage[span].innerHTML = '';
    }


    if (current_page == 1) {

        if (fnamereg.test(fname) == false) {
            document.getElementById('fnameerror').innerHTML = 'First should not contain white space or special character or number';
            document.getElementById('fname').focus()
            validate = false
        }
        if (!fnamereg.test(lname)) {
            document.getElementById('lnameerror').innerHTML = 'should not contain white space or special character or number';
            document.getElementById('lname').focus()
            validate = false
        }
        if (!emptyreg.test(designation)) {
            document.getElementById('designationerror').innerHTML = 'Designation is Empty not contain space';
            document.getElementById('designation').focus()
            validate = false
        }
        if (add1 == "") {
            document.getElementById('add1error').innerHTML = 'Address is Empty';
            document.getElementById('add1').focus()
            validate = false
        }
        if (!emailregx.test(email)) {
            document.getElementById('emailerror').innerHTML = 'Enter Valid Email ';
            document.getElementById('email').focus()
            validate = false
        }
        if (state == "") {
            document.getElementById('stateerror').innerHTML = 'Select State';
            document.getElementById('state').focus()
            validate = false
        }
        if (!fnamereg.test(city)) {
            document.getElementById('cityerror').innerHTML = 'City should not contain white space or special character or number'
            document.getElementById('city').focus()
            validate = false
        }
        if (!phonenoregx.test(phoneno)) {
            document.getElementById('phonenoerror').innerHTML = 'Phone number should be 10 digit only'
            document.getElementById('phoneno').focus()
            validate = false
        }

        if (!pincoderegx.test(pincode)) {
            document.getElementById('pincodeerror').innerHTML = 'empty pincode should be 6 digit only'
            document.getElementById('pincode').focus()
            validate = false
        }
        if (!dateregx.test(dob)) {
            document.getElementById('doberror').innerHTML = 'dob is empty or in invalid format'
            document.getElementById('dob').focus()
            validate = false
        }
        if (male.checked == false && female.checked == false) {
            document.getElementById('gendererror').innerHTML = 'Select Gender'
            validate = false
            if (male.checked == true && female.checked == false || male.checked == false && female.checked == true) {
                document.getElementById('gendererror').innerHTML = ''
            }
        }
        else {
            document.getElementById('gendererror').innerHTML = ''
        }
    }
    if (current_page == 2) {
        ajaxsscvalidation();
        ajaxhscvalidation();
        ajaxbechlorevalidation();
        ajaxmastervalidation();
    }

    if (current_page == 3) {
        for (let i = 0; i < company.length; i++) {
            ajaxcompanyvalidation(company[i], workdesignation[i], fromdate[i], todate[i]);
        }
    }

    if (current_page == 5) {
        for (let r = 0; r < reference_name.length; r++) {
            ajaxreferencevalidation(reference_name[r], reference_contact[r], reference_relation[r]);
        }
    }

    if (current_page == 4) {

        if (!language1.checked && !language2.checked && !language3.checked) {
            document.getElementById('languageerror').innerHTML = 'Check any one language'
            validate = false
        }

        if (!technology1.checked && !technology2.checked && !technology3.checked && !technology4.checked) {
            document.getElementById('technologyerror').innerHTML = 'check any one technology'
            validate = false
        }
    }

    ajaxlanguageandabality();

    if (current_page == 6) {
        ajaxpreferencevalidation();
    }
    console.log("check validation " + validate)
    if (validate == false) {
        return false
    }
    console.log("check validation after " + validate)
    return validate;
}