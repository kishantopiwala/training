const { con } = require('../../connection.js');
const scriptjs = require('../../public/js/jobform.js');
function jobform(req, res) {
    res.render('pages/task10/jobform');
}
async function job_submitform(req, res) {
    const { fname, lname, designation, add1, add2, email, state, city, phoneno, gender, relation_status, dob, pincode } = req.body

    var insert_basic_details = `insert into basic_details(first_name,last_name,email,add1,add2,phone_number,relation_status,dob,state,city,pincode,designation,gender)
    values('${fname}','${lname}','${email}','${add1}','${add2}',${phoneno},${relation_status},'${dob}','${state}','${city}',${pincode},'${designation}',${gender})`;

    let lastindex = await basic_details()
    function basic_details() {
        return new Promise((resolve, reject) => {
            con.query(insert_basic_details, (error, result) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
                else {
                    resolve(result.insertId)
                    console.log('Basic Details Added')
                }
            })
        })
    }
    function education_details(req, res) {
        let { course_name, passingyear, percentage } = req.body;

        course_name = course_name.filter((course) => course.length > 1)
        passingyear = passingyear.filter((year) => year.length > 1)
        percentage = percentage.filter((percent) => percent > 0)

        for (i = 0; i < course_name.length; i++) {
            var insert_education_details = `insert into education(emp_id,course_name,year_,percentage) value(${lastindex},'${course_name[i]}' ,${passingyear[i]},${percentage[i]})`;
            con.query(insert_education_details, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Education Details Added')
                }
            })
        }
    }
    education_details(req, res)

    function work_details(req, res) {
        let { companys, workdesignation, fromdates, todates } = req.body
        companys = companys.filter((company) => company.length > 1)
        workdesignation = workdesignation.filter((des) => des.length > 1)
        fromdates = fromdates.filter((frmd) => frmd.length == 10)
        todates = todates.filter((tod) => tod.length == 10)

        for (i = 0; i < companys.length; i++) {
            var insert_work_experiance = `insert into work_experiance(emp_id,company_name,designation,from_date,to_date) value(${lastindex},'${companys[i]}' ,'${workdesignation[i]}','${fromdates[i]}',' ${todates[i]}')`;
            con.query(insert_work_experiance, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Work Details Added')
                }
            })
        }
    }
    work_details(req, res)

    function reference_contact(req, res) {
        let { reference_names, reference_contacts, reference_relations } = req.body
        reference_names = reference_names.filter((reference_name) => reference_name.length > 1)
        reference_contacts = reference_contacts.filter((reference_contact) => reference_contact.length > 1)
        reference_relations = reference_relations.filter((reference_relation) => reference_relation.length > 1)


        for (i = 0; i < reference_names.length; i++) {
            var insert_reference = `insert into reference_contact(emp_id,ref_name,ref_contact_number,reference_relation) value(${lastindex},'${reference_names[i]}' ,'${reference_contacts[i]}','${reference_relations[i]}')`;
            con.query(insert_reference, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('References Added')
                }
            })
        }
    }
    reference_contact(req, res)

    function preference(req, res) {
        let { p_location, notice_period, expacted_ctc, current_ctc, p_department } = req.body
        var insert_reference = `insert into preferences(emp_id,city,expected_ctc,current_ctc,notice_period,department) value(${lastindex},'${p_location}' ,${expacted_ctc},${current_ctc},${notice_period},'${p_department}')`;
        con.query(insert_reference, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Preferences Added')
            }
        })
    }
    preference(req, res);

    function language(req, res) {
        let { languages, language1ability, language2ability, language3ability } = req.body
        abilitys = [language1ability, language2ability, language3ability]
        for (let language = 0; language < languages.length; language++) {

            for (let ability = 0; ability < abilitys[language].length; ability++) {
                var insert_language = `insert into language(emp_id,lan_name,ability) value(${lastindex},'${languages[language]}','${abilitys[language][ability]}')`;
                con.query(insert_language, (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Language Added')
                    }
                })
            }

        }
    }
    language(req, res)

    function technology(req, res) {
        let { technologys, technology1ability, technology2ability, technology3ability, technology4ability } = req.body
        abilitys = [technology1ability, technology2ability, technology3ability, technology4ability]
        abilitys = abilitys.filter((ability) => ability != null && ability != undefined)
        for (let tech = 0; tech < technologys.length; tech++) {
            var insert_reference = `insert into technologies(emp_id,tech_name,ability) value(${lastindex},'${technologys[tech]}','${abilitys[tech]}')`;
            con.query(insert_reference, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Technology Added')
                    res.send("Data Added Succesfully")
                }
            })
        }
    }
    technology(req, res)
}


function showemployees(req, res) {
    var selectemployee = 'select emp_id,first_name,last_name,email,add1 from basic_details'
    con.query(selectemployee, (error, row, col) => {
        if (error) {
            throw error
        } else {
            res.render('pages/task10/showemployee', { row, col })
        }
    })
}
function basic_details(req, res) {
    var emp_id = req.params.emp_id;
    var basic_details = 'select * from basic_details where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(basic_details, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

function education_details(req, res) {
    var emp_id = req.params.emp_id;
    var education_detail = 'select * from education where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(education_detail, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                id = result.map(obj => {
                    return obj.id;
                })
                courses = result.map(obj => {
                    return obj.course_name;
                })
                years = result.map(obj => {
                    return obj.year_;
                })
                percentages = result.map(obj => {
                    return obj.percentage
                })
                return resolve({ id, courses, years, percentages })
            }
        })
    })
}

function work_details(req, res) {
    var emp_id = req.params.emp_id;
    var work_experiance = 'select id,emp_id,company_name,designation,from_date,to_date from work_experiance where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(work_experiance, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                work_ids = result.map(obj => {
                    return obj.id
                });
                company_names = result.map(obj => {
                    return obj.company_name
                });
                work_designation = result.map(obj => {
                    return obj.designation
                });
                fromdates = result.map(obj => {
                    obj.from_date = convert(obj.from_date.toString())
                    return obj.from_date
                });
                todates = result.map(obj => {
                    obj.to_date = convert(obj.to_date.toString())
                    return obj.to_date
                });
                function convert(str) {
                    var date = new Date(str),
                        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                        day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                }
                return resolve({ work_ids, company_names, work_designation, fromdates, todates })
            }
        })
    })
}

function reference_contacts(req, res) {
    var emp_id = req.params.emp_id;
    var reference_contact = 'select id,emp_id,ref_name,ref_contact_number,reference_relation from reference_contact where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(reference_contact, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                ref_id = result.map(obj => {
                    return obj.id
                });
                ref_name = result.map(obj => {
                    return obj.ref_name
                });
                ref_contact_number = result.map(obj => {
                    return obj.ref_contact_number
                });
                reference_relation = result.map(obj => {
                    return obj.reference_relation
                });
                return resolve({ ref_id, ref_name, ref_contact_number, reference_relation })
            }
        })
    })
}

function languages(req, res) {
    var emp_id = req.params.emp_id;
    var language = 'select * from language where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(language, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                const lanuages = result.reduce((accumulator, item) => {
                    const language = item.lan_name;
                    if (!accumulator[language]) {
                        accumulator[language] = []
                    }
                    accumulator[language].push(item.ability)
                    return accumulator
                }, {})
                return resolve(lanuages)
            }
            // }
        })
    })
}
function technologies(req, res) {
    var emp_id = req.params.emp_id;
    var technologiequery = 'select * from technologies where emp_id = ?'
    return new Promise((resolve, reject) => {

        con.query(technologiequery, [emp_id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                const technames = result.map((obj) => {
                    return obj.tech_name
                })
                const techability = result.map((obj) => {
                    return obj.ability
                })
                return resolve({ technames, techability })
            }
        })
    })
}
function preferences(req, res) {
    var emp_id = req.params.emp_id;
    var preference = 'select * from preferences where emp_id = ?'
    return new Promise((resolve, reject) => {
        con.query(preference, [emp_id], (error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

async function getemployeedetail(req, res) {
    var result;
    var basic = await basic_details(req, res);
    var education = await education_details(req, res);
    var work = await work_details(req, res)
    var lang = await languages(req, res)
    var ref = await reference_contacts(req, res);
    var tech = await technologies(req, res);
    var pref = await preferences(req, res);
    result = basic[0]
    result['education_id'] = education.id;
    result['courses'] = education.courses
    result['years'] = education.years
    result['percentages'] = education.percentages;
    result['work_ids'] = work.work_ids;
    result['company_names'] = work.company_names;
    result['work_designation'] = work.work_designation;
    result['fromdates'] = work.fromdates;
    result['todates'] = work.todates;
    result['ref_id'] = ref.ref_id;
    result['ref_name'] = ref.ref_name;
    result['ref_contact_number'] = ref.ref_contact_number;
    result['reference_relation'] = ref.reference_relation;
    result['english'] = lang.english;
    result['hindi'] = lang.hindi;
    result['gujarati'] = lang.gujarati;
    result['technames'] = tech.technames;
    result['techability'] = tech.techability;
    result['pref_city'] = pref[0].pref_city;
    result['exp_ctc'] = pref[0].expected_ctc;
    result['current_ctc'] = pref[0].current_ctc;
    result['notice'] = pref[0].notice_period;
    result['pref_department'] = pref[0].pref_department;

    console.log(result)
    res.render('pages/task10/jobform', { result })
}


//  education_details(req,res);


async function updateemployee(req, res) {
    const { emp_id, fname, lname, designation, add1, add2, email, state, city, phoneno, gender, relation_status, dob, pincode } = req.body
    var update_basic_details = `update basic_details set first_name = ?,last_name = ?,email = ? ,add1 = ? ,add2 = ?,phone_number = ?,relation_status = ?,dob=?,state=? 
    ,city = ?,pincode=?,designation=?,gender=? where emp_id =${emp_id};`

    function updatebasic_details() {
        return new Promise((resolve, reject) => {
            con.query(update_basic_details, [fname, lname, email, add1, add2, phoneno, relation_status, dob, state, city, pincode, designation, gender], (error, result) => {
                if (error) {
                    reject(error)
                    console.log(error)
                }
                else {
                    resolve()
                    console.log('Basic Details Updated');
                }
            })
        })
    }
    updatebasic_details();

    function updateeducation(req, res) {
        let { emp_id, edu_id, course_name, passingyear, percentage } = req.body;
        return new Promise((resolve, reject) => {
            edu_id = edu_id.filter((id) => id.length > 0)
            course_name = course_name.filter((course) => course.length > 1)
            passingyear = passingyear.filter((year) => year.length > 1)
            percentage = percentage.filter((percent) => percent > 0)

            for (i = 0; i < course_name.length; i++) {
                var update_education_details = `update education set course_name = ? ,year_ = ?,percentage = ? where id =${edu_id[i]} and emp_id= ${emp_id};`
                con.query(update_education_details, [course_name[i], Number(passingyear[i]), Number(percentage[i])], (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Education Details Updated')
                    }
                })
            }
        })
    }
    updateeducation(req, res)
    function updatework(req, res) {
        let { emp_id, workid, companys, workdesignation, fromdates, todates } = req.body
        return new Promise((resolve, reject) => {
            workid = workid.filter((workid) => workid.length > 1)
            companys = companys.filter((company) => company.length > 1)
            workdesignation = workdesignation.filter((des) => des.length > 1)
            fromdates = fromdates.filter((frmd) => frmd.length == 10)
            todates = todates.filter((tod) => tod.length == 10)
            for (i = 0; i < companys.length; i++) {
                var update_work_details = `update work_experiance set company_name = ? ,designation = ?,from_date = ?,to_date = ? where id =${workid[i]} and emp_id= ${emp_id};`
                var insert_work_experiance = `insert into work_experiance(emp_id,company_name,designation,from_date,to_date) value(${emp_id},'${companys[i]}' ,'${workdesignation[i]}','${fromdates[i]}',' ${todates[i]}')`;

                var query = update_work_details
                if (!workid[i]) {
                    query = insert_work_experiance;
                }

                con.query(query, [companys[i], workdesignation[i], fromdates[i], todates[i]], (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('work Details Updated')
                    }
                })
            }
        })
    }
    updatework(req, res);
    function updatelanugages(req, res) {
        let { emp_id, languages, language1ability, language2ability, language3ability } = req.body
        var abilitys = [language1ability, language2ability, language3ability]
        // await deletelanguage()
        con.query(`delete from language where emp_id=${emp_id}`, (error, result) => {
            if (error) {
                throw error
                // return reject(error)
            }
            else {
                console.log("language Deleted")
            }
        })

        for (let language = 0; language < languages.length; language++) {

            for (let ability = 0; ability < abilitys[language].length; ability++) {

                var insert_language = `insert into language(emp_id,lan_name,ability) value(${emp_id},'${languages[language]}','${abilitys[language][ability]}')`;
                con.query(insert_language, (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Language updated')
                    }
                })
            }

        }

    }
    updatelanugages(req, res);

    // Update Technologies
    function updatetechnologies(req, res) {
        let { emp_id, technologys, technology1ability, technology2ability, technology3ability, technology4ability } = req.body
        abilitys = [technology1ability, technology2ability, technology3ability, technology4ability]
        abilitys = abilitys.filter((ability) => ability != null && ability != undefined)
        // var deletetechnologies = new Promise((reject, resolve) => {
        con.query(`delete from technologies where emp_id=${emp_id}`, (error, result) => {
            if (error) {
                // return reject(error)
                console.log(error)
            }
            else {
                console.log("technologies Deleted")
                // return resolve(result)
            }
        })
        // });
        // deletetechnologies.then(() => {
        for (let tech = 0; tech < technologys.length; tech++) {
            var insert_reference = `insert into technologies(emp_id,tech_name,ability) value(${emp_id},'${technologys[tech]}','${abilitys[tech]}')`;
            con.query(insert_reference, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Technology updated')
                }
            })
        }
        // })
    }
    updatetechnologies(req, res)

    // update reference_contact

    function reference_contact_update(req, res) {

        let { ref_id, emp_id, reference_names, reference_contacts, reference_relations } = req.body
        reference_id = reference_names.filter((reference_id) => reference_id.length > 1)
        reference_names = reference_names.filter((reference_name) => reference_name.length > 1)
        reference_contacts = reference_contacts.filter((reference_contact) => reference_contact.length > 1)
        reference_relations = reference_relations.filter((reference_relation) => reference_relation.length > 1)

        for (i = 0; i < reference_id.length; i++) {
            var update_reference_details = `update reference_contact set ref_name = ? ,ref_contact_number = ?,reference_relation = ? where id =${ref_id[i]} and emp_id= ${emp_id};`
            var insert_reference = `insert into reference_contact(emp_id,ref_name,ref_contact_number,reference_relation) value(${emp_id},'${reference_names[i]}' ,'${reference_contacts[i]}','${reference_relations[i]}')`;
            query = update_reference_details;
            if (!ref_id[i]) {
                var query = insert_reference
            }
            con.query(query, [reference_names[i], reference_contacts[i], reference_relations[i]], (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('reference Details Updated')
                }
            })
        }
    }
    reference_contact_update(req, res)

    // preference detail update

    function preference_update(req, res) {
        let { emp_id, p_location, notice_period, expacted_ctc, current_ctc, p_department } = req.body
        var insert_reference = `insert into preferences(emp_id,pref_city,expected_ctc,current_ctc,notice_period,pref_department) value(${emp_id},'${p_location}' ,${expacted_ctc},${current_ctc},${notice_period},'${p_department}')`;
        var update_preference = `update preferences set pref_city =?, expected_ctc=?,current_ctc=?,notice_period=?,pref_department=? where emp_id = ?`;
        con.query(update_preference, [p_location, expacted_ctc, current_ctc, notice_period, p_department, Number(emp_id),], (error) => {
            if (error) {
                console.log(error)
                res.send("Error in updating Data")
            } else {
                console.log('Preferences Update')
            }
        })
    }
    preference_update(req, res)
    res.send('data updated')
}


function deleteemployee(req, res) {
    var emp_id = req.params.emp_id;
    var deleteuser = `delete from basic_details`
}

module.exports = { jobform, job_submitform, showemployees, getemployeedetail, updateemployee }