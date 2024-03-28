
function sscvalidation() {
    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;
    var percentageregx = /^[0-9]{1,3}$/;
    var year = /^[0-9]{4}$/;
    var validate = true;
    var ssc = document.getElementById('ssc').value;
    var sscpassingyear = document.getElementById('sscpassingyear').value;
    var sscpercentage = document.getElementById('sscpercentage').value;
    if (emptyreg.test(ssc) || emptyreg.test(sscpassingyear) || emptyreg.test(sscpercentage)) {
        if (!emptyreg.test(ssc)) {
            document.getElementById('sscerror').innerHTML = 'ssc is Empty'
            document.getElementById('ssc').focus()
            validate = false;
        }
        if (!year.test(sscpassingyear)) {
            document.getElementById('sscpassingyearerror').innerHTML = 'ssc Passing Year is Empty or it is not valid';
            document.getElementById('sscpassingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(sscpercentage)) {
            document.getElementById('sscpercentageerror').innerHTML = 'ssc Percentage is Empty'
            document.getElementById('sscpercentage').focus()
            validate = false;
        }
    }
    return validate
}

function hscvalidation() {
    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;
    var percentageregx = /^[0-9]{1,3}$/;
    var year = /^[0-9]{4}$/;
    var validate = true;
    var hsc = document.getElementById('hsc').value;
    var hscpassingyear = document.getElementById('hscpassingyear').value;
    var hscpercentage = document.getElementById('hscpercentage').value;

    if (emptyreg.test(hsc) || emptyreg.test(hscpassingyear) || emptyreg.test(hscpercentage)) {
        if (!emptyreg.test(hsc)) {
            document.getElementById('hscerror').innerHTML = 'hsc is Empty'
            document.getElementById('hsc').focus()
            validate = false;
        }
        if (!year.test(hscpassingyear)) {
            document.getElementById('hscpassingyearerror').innerHTML = 'hsc Passing Year is Empty or it is not valid';
            document.getElementById('hscpassingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(hscpercentage)) {
            document.getElementById('hscpercentageerror').innerHTML = 'hsc Percentage is Empty'
            document.getElementById('hscpercentage').focus()
            validate = false;
        }
    }
    return validate
}

function bechlorevalidation() {
    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;
    // var percentageregx = /^[0-9]{1,3}$/;
    var percentageregx = /(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/
    var year = /^[0-9]{4}$/;
    var validate = true;
    var b_course_name = document.getElementById('b_course_name').value;
    // var b_university_name = document.getElementById('b_university_name').value;
    var b_passingyear = document.getElementById('b_passingyear').value;
    var b_percentage = document.getElementById('b_percentage').value;
    if (emptyreg.test(b_course_name) || emptyreg.test(b_passingyear) || emptyreg.test(b_percentage)) {
        if (!emptyreg.test(b_course_name)) {
            document.getElementById('b_course_name').focus()
            document.getElementById('b_course_nameerror').innerHTML = 'Course name is Empty'
            validate = false;
        }
        if (!year.test(b_passingyear)) {
            document.getElementById('b_passingyearerror').innerHTML = 'Bechlore Passing Year is Empty or it is not valid';
            document.getElementById('b_passingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(b_percentage)) {
            document.getElementById('b_percentageerror').innerHTML = 'Percentage is Empty'
            document.getElementById('b_percentage').focus()
            validate = false;
        }
    }
    return validate;
}

function mastervalidation() {
    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;
    var percentageregx = /^[0-9]{1,3}$/;
    var year = /^[0-9]{4}$/;
    var validate = true;
    var m_course_name = document.getElementById('m_course_name').value;
    // var m_university_name = document.getElementById('m_university_name').value;
    var m_passingyear = document.getElementById('m_passingyear').value;
    var m_percentage = document.getElementById('m_percentage').value;
    if (emptyreg.test(m_course_name) || emptyreg.test(m_passingyear) || emptyreg.test(m_percentage)) {

        if (!emptyreg.test(m_course_name)) {
            document.getElementById('m_course_name').focus()
            document.getElementById('m_course_nameerror').innerHTML = 'Course name is Empty'
            validate = false;
        }
        if (!year.test(m_passingyear)) {
            document.getElementById('m_passingyearerror').innerHTML = 'Master Passing Year is Empty or it is not valid';
            document.getElementById('m_passingyear').focus();
            validate = false;
        }
        if (!percentageregx.test(m_percentage)) {
            document.getElementById('m_percentageerror').innerHTML = 'Percentage is Empty'
            document.getElementById('m_percentage').focus()
            validate = false;
        }
    }
    return validate
}

function companyvalidation(compnayname, designaion, fromdate, todate) {
    var emptyreg = /^\w+$/;
    var fnamereg = /^[a-zA-Z]+$/;
    var dateregx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    var compnaynameerror = compnayname.id + "error";
    var desiganigationerror = designaion.id + "error"
    var fromdateerror = fromdate.id + "error";
    var todateerror = todate.id + "error";
    var validate = true;
    console.log(compnaynameerror)
    console.log("This is Designation" + designaion)
    console.log(desiganigationerror)
    if (emptyreg.test(compnayname.value) || emptyreg.test(designaion.value) || emptyreg.test(fromdate.value) || emptyreg.test(todate.value)) {

        if (!emptyreg.test(compnayname.value)) {
            compnayname.focus()
            document.getElementById(compnaynameerror).innerHTML = 'Company name is Empty';
            validate = false;
        }
        if (!fnamereg.test(designaion.value)) {

            designaion.focus()
            document.getElementById(desiganigationerror).innerHTML = 'Designation is Empty';
            validate = false;
        }

        if (!dateregx.test(fromdate.value)) {
            // fromdate.focus();
            document.getElementById(fromdateerror).innerHTML = 'select date';;
            validate = false;
        }
        if (!dateregx.test(todate.value)) {
            // todate.focus()
            document.getElementById(todateerror).innerHTML = 'select date';
            validate = false;
        }

    }
    return validate
}

function languageandabality() {
    var language1 = document.getElementById('language1');
    var language2 = document.getElementById('language2');
    var language3 = document.getElementById('language3');
    var technology1 = document.getElementById('technology1');
    var technology2 = document.getElementById('technology2');
    var technology3 = document.getElementById('technology3');
    var technology4 = document.getElementById('technology4');

    var languag1ability1 = document.getElementsByClassName('languageability1')
    var languageability2 = document.getElementsByClassName('languageability2')
    var languageability3 = document.getElementsByClassName('languageability3')
    var technologyability1 = document.getElementsByClassName('technologyability1')
    var technologyability2 = document.getElementsByClassName('technologyability2')
    var technologyability3 = document.getElementsByClassName('technologyability3')
    var technologyability4 = document.getElementsByClassName('technologyability4')

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

function referencevalidation(name, r_number, relation) {
    var emptyreg = /^\w+$/;
    var namereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;

    var reference_nameerror = name.id + "error";
    var reference_contacterror = r_number.id + "error"
    var reference_relationerror = relation.id + "error";
    var validate = true;
    if (emptyreg.test(name.value) || phonenoregx.test(r_number.value) || emptyreg.test(relation.value)) {

        if (!namereg.test(name.value)) {
            name.focus()
            document.getElementById(reference_nameerror).innerHTML = ' name is Empty';
            validate = false;
        }
        if (!phonenoregx.test(r_number.value)) {
            document.getElementById(reference_contacterror).innerHTML = 'Contact is Empty or invalid';
            validate = false;
        }

        if (!namereg.test(relation.value)) {
            // relation.focus();
            document.getElementById(reference_relationerror).innerHTML = 'Relation empty';
            validate = false;
        }
    }
    return validate
}

function preferencevalidation() {
    var emptyreg = /^\w+$/;
    var namereg = /^[a-zA-Z]+$/;
    var phonenoregx = /^[0-9]{10}$/;
    var noticeperiodregx = /^[0-9]{1,2}$/;
    var salaryregx = /^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/
    var p_location = document.getElementById('p_location');
    var notice_period = document.getElementById('notice_period')
    var expacted_ctc = document.getElementById('expacted_ctc')
    var current_ctc = document.getElementById('current_ctc')
    var p_department = document.getElementById('p_department')
    var validate = true;
    if (emptyreg.test(p_location.value) || emptyreg.test(notice_period.value) || emptyreg.test(expacted_ctc.value) || emptyreg.test(current_ctc || emptyreg.test(p_department))) {
        if (!namereg.test(p_location.value)) {
            p_location.focus()
            document.getElementById('p_locationerror').innerHTML = 'select Location';
            validate = false;
        }

        if (!noticeperiodregx.test(notice_period.value)) {
            notice_period.focus();
            document.getElementById('notice_perioderror').innerHTML = 'Notice Period is Empty or invalid';
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
    return validate
}

function validateform() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var designation = document.getElementById('designation').value;
    var add1 = document.getElementById('add1').value;
    var add2 = document.getElementById('add2').value;
    var email = document.getElementById('email').value;
    var state = document.getElementById('state').value;
    var phoneno = document.getElementById('phoneno').value;
    var city = document.getElementById('city').value;
    var male = document.getElementById('male');
    var female = document.getElementById('female');
    var pincode = document.getElementById('pincode').value;
    var relation_status = document.getElementById('relation_status').value;
    var dob = document.getElementById('dob').value;
    var errormessage = document.getElementsByClassName('errormessage');

    var company = document.getElementsByClassName('company');
    var workdesignation = document.getElementsByName('workdesignation');
    var fromdate = document.getElementsByClassName('fromdate');
    var todate = document.getElementsByClassName('todate');

    var reference_name = document.getElementsByClassName('reference_name');
    var reference_contact = document.getElementsByClassName('reference_contact');
    var reference_relation = document.getElementsByClassName('reference_relation');


    var language1 = document.getElementById('language1');
    var language2 = document.getElementById('language2')
    var language3 = document.getElementById('language3')
    var technology1 = document.getElementById('technology1')
    var technology2 = document.getElementById('technology2')
    var technology3 = document.getElementById('technology3')
    var technology4 = document.getElementById('technology4')

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
    if (!emptyreg.test(designation)) {
        document.getElementById('designationerror').innerHTML = 'Designation is Empty';
        document.getElementById('designation').focus()
        validate = false
    }
    if (add1 == "") {
        document.getElementById('add1error').innerHTML = 'Address is Empty';
        document.getElementById('add1').focus()
        validate = false
    }
    if (!emailregx.test(email)) {
        document.getElementById('emailerror').innerHTML = 'Email is Empty or other than character';
        document.getElementById('email').focus()
        validate = false
    }
    if (state == "") {
        document.getElementById('stateerror').innerHTML = 'Select State';
        document.getElementById('state').focus()
        validate = false
    }
    if (!fnamereg.test(city)) {
        document.getElementById('cityerror').innerHTML = 'City is Empty or other than character'
        document.getElementById('city').focus()
        validate = false
    }
    if (!phonenoregx.test(phoneno)) {
        document.getElementById('phonenoerror').innerHTML = 'empty Phone number should be 10 digit only'
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
            validate = true;
        }
    }
    else {
        document.getElementById('gendererror').innerHTML = ''
    }
    const sscvalidate = sscvalidation();
    const hscvalidate = hscvalidation();
    const bechlorevalidate = bechlorevalidation();
    const mastervalidate = mastervalidation();

    // if (current_page == 3) {   
    for (let i = 0; i < company.length - 1; i++) {

        var workvalidate = companyvalidation(company[i], workdesignation[i], fromdate[i], todate[i]);
    }
    // }

    for (let r = 0; r < reference_name.length; r++) {
        var referencevalidate = referencevalidation(reference_name[r], reference_contact[r], reference_relation[r]);
    }

    if (current_page == 4) {

        if (!language1.checked && !language2.checked && !language3.checked) {
            document.getElementById('languageerror').innerHTML = 'Check any one language'
            validate = false
        }
        else {
        }

        if (!technology1.checked && !technology2.checked && !technology3.checked && !technology4.checked) {
            document.getElementById('technologyerror').innerHTML = 'check any one technology'
            validate = false
        }
    }

    languageandabality();
    var preferencesvalidate = preferencevalidation();
    if (validate == false || workvalidate == false || referencevalidate == false || preferencesvalidate == false || sscvalidate == false || hscvalidate == false || bechlorevalidate == false || mastervalidate == false) {
        validate == false
    }

    return validate;
}