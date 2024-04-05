url = window.location.href;
const form = document.getElementById('form')
if (url.includes('updateemployee')) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(form)
        const data = new URLSearchParams(formdata).toString()
        console.log(validate)

        if (ajaxvalidateform() == true) {
            console.log("form Updated")
            updatedata(data)
        }
    })
}
else {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(form)
        console.log(validate)

        const data = new URLSearchParams(formdata).toString()
        if (ajaxvalidateform() == true) {
            console.log("form Submited")
            submitdata(data)
        }
    })
}

async function submitdata(data) {
    const response = await fetch('http://localhost:8080/ajax/submitdetails', {
        method: 'POST',
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/x-www-form-urlencoded"
        },
        body: data
    })

    var responsedata = await response.text();

    if (responsedata) {
        window.location.replace('http://localhost:8080/ajax/employees')
    }
}

async function updatedata(data) {
    const response = await fetch('http://localhost:8080/ajax/updateemployee', {
        method: 'POST',
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/x-www-form-urlencoded"
        },
        body: data
    })
    var responsedata = await response.json();

    if (responsedata.status == 200) {
        window.location.replace('http://localhost:8080/ajax/employees')
    }
}

async function getuserdata() {
    var response = await fetch('http://localhost:8080/ajax/getemployeedetail')
    var result = await response.json()
}

if (url.includes('updateemployee')) {
    var emp_id = Number(url.slice(url.lastIndexOf('/') + 1))
    var body = document.getElementById('body')
    setdata()


    async function setdata() {
        const response = await fetch(`http://localhost:8080/ajax/getemployeedetail/${emp_id}`);
        const result = await response.json();
        document.getElementById('emp_id').value = result.emp_id;
        document.getElementById('fname').value = result.first_name;
        document.getElementById('lname').value = result.last_name;
        document.getElementById('designation').value = result.designation;
        document.getElementById('add1').innerHTML = result.add1;
        document.getElementById('add2').innerHTML = result.add2;
        document.getElementById('city').value = result.city;
        document.getElementById('pincode').value = result.pincode;
        document.getElementById('email').value = result.email;
        document.getElementById('phoneno').value = result.phone_number;
        document.getElementById('dob').value = result.dob;
        const state = document.getElementById('state');
        state.value = result.state
        const gender = result.gender
        const male = document.getElementById('male');
        const female = document.getElementById('female');
        if (gender == 1) {
            male.checked = true;
        }
        else {
            female.checked = true;
        }
        let relation_status = document.getElementById('relation_status')
        relation_status = result.relations_status


        // Set education Details
        let edu_id = document.getElementsByName('edu_id');
        let coursesnames = document.getElementsByName('course_name');
        let passingyear = document.getElementsByName('passingyear');
        let percentage = document.getElementsByName('percentage');

        for (let course = 0; course < result.courses.length; course++) {

            edu_id[course].value = result.education_id[course]
            coursesnames[course].value = result.courses[course]
            passingyear[course].value = result.years[course]
            percentage[course].value = result.percentages[course]
        }

        // Set Work Details

        let workid = document.getElementsByName('workid');
        let companys = document.getElementsByName('companys');
        let workdesignation = document.getElementsByName('workdesignation');
        let fromdates = document.getElementsByName('fromdates');
        let todates = document.getElementsByName('todates');
        for (let work = 0; work < result.company_names.length; work++) {
            workid[work].value = result.work_ids[work]
            companys[work].value = result.company_names[work]
            workdesignation[work].value = result.work_designation[work]
            fromdates[work].value = result.fromdates[work]
            todates[work].value = result.todates[work]
        }

        // set Language and technologies
        let language1ability = document.getElementsByName('language1ability[]');
        let language2ability = document.getElementsByName('language2ability[]');
        let language3ability = document.getElementsByName('language3ability[]');

        if (result.hindi) {
            for (let hindi = 0; hindi < result.hindi.length; hindi++) {

                document.getElementById('language1').checked = true;
                language1ability.forEach((ability) => {
                    if (ability.value == result.hindi[hindi]) {
                        ability.checked = true;
                    }

                })
            }
        }
        if (result.english) {
            for (let english = 0; english < result.english.length; english++) {
                document.getElementById('language2').checked = true;
                language2ability.forEach((ability) => {
                    if (ability.value == result.english[english]) {
                        ability.checked = true;
                    }

                })
            }
        }
        if (result.gujarati) {
            for (let gujarati = 0; gujarati < result.gujarati.length; gujarati++) {
                document.getElementById('language3').checked = true;
                language3ability.forEach((ability) => {
                    if (ability.value == result.gujarati[gujarati]) {
                        ability.checked = true;
                    }

                })
            }
        }

        // set Technologies Value
        let technologys = document.getElementsByName('technologys[]');
        let tech_id = document.getElementsByName('tech_id');
        for (let tech = 0; tech < result.technames.length; tech++) {
            technologys[tech].checked = true;
            tech_id[tech].value = result.techid[tech];

            for (let techability = 0; techability < 3; techability++) {

                if (document.getElementsByName(`technology${tech + 1}ability[]`)[techability].value == result.techability[tech]) {
                    document.getElementsByName(`technology${tech + 1}ability[]`)[techability].checked = true;
                }
            }
        }

        // set referance Contact Value
        let reference_names = document.getElementsByName('reference_names');
        let reference_contacts = document.getElementsByName('reference_contacts');
        let reference_relations = document.getElementsByName('reference_relations');
        let reference_id = document.getElementsByName('ref_id');

        for (let ref = 0; ref < result.ref_name.length; ref++) {
            reference_id[ref].value = result.ref_id[ref];
            reference_names[ref].value = result.ref_name[ref];
            reference_contacts[ref].value = result.ref_contact_number[ref];
            reference_relations[ref].value = result.reference_relation[ref];
        }

        // set Preference Value

        document.getElementById('p_location').value = result.pref_city;
        document.getElementById('notice_period').value = result.notice;
        document.getElementById('expacted_ctc').value = result.exp_ctc;
        document.getElementById('current_ctc').value = result.current_ctc;
        document.getElementById('p_department').value = result.pref_department;
    }
}