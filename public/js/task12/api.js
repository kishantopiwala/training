url = window.location.href;
const form = document.getElementById('form')
if (url.includes('updateemployee')) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(form)
        const data = new URLSearchParams(formdata).toString()
        updatedata(data)
    })
}
else {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formdata = new FormData(form)
        const data = new URLSearchParams(formdata).toString()
        submitdata(data)
    })
}

async function submitdata(data) {
    // validateform();
    const response = await fetch('http://localhost:8080/task12/submitdetails', {
        method: 'POST',
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/x-www-form-urlencoded"
        },
        body: data
    })

    var responsedata = await response.text();

    console.log(responsedata)
    if(responsedata){
        window.location.replace('http://localhost:8080/task12/employees')
    }
}

async function updatedata(data) {
    // validateform();
    const response = await fetch('http://localhost:8080/task12/updateemployee', {
        method: 'POST',
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/x-www-form-urlencoded"
        },
        body: data
    })
    var responsedata = await response.text();

    console.log(responsedata)
    if(responsedata){
        window.location.replace('http://localhost:8080/task12/employees')
    }
}

async function getuserdata() {
    var response = await fetch('http://localhost:8080/task12/getemployeedetail')
    var result = await response.json()
}

if (url.includes('updateemployee')) {
    var emp_id = Number(url.slice(url.lastIndexOf('/') + 1))
    var body = document.getElementById('body')
    setdata()
    // body.addEventListener('load', setdata())


    async function setdata() {
        var response = await fetch(`http://localhost:8080/task12/getemployeedetail/${emp_id}`);
        var result = await response.json();

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
        var state = document.getElementById('state');
        state.value = result.state
        var gender = result.gender
        var male = document.getElementById('male');
        var female = document.getElementById('female');
        if (gender == 1) {
            male.checked = true;
        }
        else {
            female.checked = true;
        }
        var relation_status = document.getElementById('relation_status')
        console.log(result.relation_status)
        relation_status = result.relations_status


        // Set education Details
        var edu_id = document.getElementsByName('edu_id');
        var coursesnames = document.getElementsByName('course_name');
        var passingyear = document.getElementsByName('passingyear');
        var percentage = document.getElementsByName('percentage');

        for (let course = 0; course < result.courses.length; course++) {

            edu_id[course].value = result.education_id[course]
            coursesnames[course].value = result.courses[course]
            passingyear[course].value = result.years[course]
            percentage[course].value = result.percentages[course]
        }

        // Set Work Details

        var workid = document.getElementsByName('workid');
        var companys = document.getElementsByName('companys');
        var workdesignation = document.getElementsByName('workdesignation');
        var fromdates = document.getElementsByName('fromdates');
        var todates = document.getElementsByName('todates');
        for (let work = 0; work < result.company_names.length; work++) {
            workid[work].value = result.work_ids[work]
            companys[work].value = result.company_names[work]
            workdesignation[work].value = result.work_designation[work]
            fromdates[work].value = result.fromdates[work]
            todates[work].value = result.todates[work]
        }

        // set Language and technologies
        var language1ability = document.getElementsByName('language1ability[]');
        var language2ability = document.getElementsByName('language2ability[]');
        var language3ability = document.getElementsByName('language3ability[]');
        
        if (result.hindi) {
            for (let hindi = 0; hindi < result.hindi.length; hindi++) {
                
                document.getElementById('language1').checked = true;
                language1ability.forEach((ability)=>{
                    if(ability.value == result.hindi[hindi]){
                        ability.checked = true;
                    }
                    
                })
                // language1ability[hindi].checked = true;
            }
        }
        if (result.english) {
            for (let english = 0; english < result.english.length; english++) {
                document.getElementById('language2').checked = true;
                language2ability.forEach((ability)=>{
                    if(ability.value == result.english[english]){
                        ability.checked = true;
                    }
                    
                })
                // language2ability[english].checked = true;
            }
        }
        if (result.gujarati) {
            for (let gujarati = 0; gujarati < result.gujarati.length; gujarati++) {
                document.getElementById('language3').checked = true;
                language3ability.forEach((ability)=>{
                    if(ability.value == result.gujarati[gujarati]){
                        ability.checked = true;
                    }
                    
                })
            }
        }

        // set Technologies Value

        for (let tech = 0; tech < result.technames.length; tech++) {
            var technologys = document.getElementsByName('technologys');
            var technology1ability = document.getElementsByName('technology1ability');
            var tech_id = document.getElementsByName('tech_id');
            technologys[tech].checked = true;
            tech_id[tech].value = result.techid[tech];
            for (let tech1 = 0; tech1 < 3; tech1++) {
                if (document.getElementsByName(`technology${tech1 + 1}ability`)[tech1].value == result.techability[tech]) {
                    document.getElementsByName(`technology${tech1 + 1}ability`)[tech1].checked = true
                }
            }
        }

        // set referance Contact Value
        var reference_names = document.getElementsByName('reference_names');
        var reference_contacts = document.getElementsByName('reference_contacts');
        var reference_relations = document.getElementsByName('reference_relations');
        var reference_id = document.getElementsByName('ref_id');

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