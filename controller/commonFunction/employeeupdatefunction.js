const { con } = require("../../connection.js");
function updatebasic_details(data) {
  const { emp_id, fname, lname, designation, add1, add2, email, state, city, phoneno, gender, relation_status, dob, pincode } = data
  var update_basic_details = `update basic_details set first_name = ?,last_name = ?,email = ? ,add1 = ? ,add2 = ?,phone_number = ?,relation_status = ?,dob=?,state=? 
,city = ?,pincode=?,designation=?,gender=? where emp_id =${emp_id};`

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

function update_education(data) {
  let { emp_id, edu_id, course_name, passingyear, percentage } = data;
  return new Promise((resolve, reject) => {
    edu_id = edu_id.filter((id) => id.length > 0)
    course_name = course_name.filter((course) => course.length > 1)
    passingyear = passingyear.filter((year) => year.length > 1)
    percentage = percentage.filter((percent) => percent > 0)

    for (i = 0; i < course_name.length; i++) {
      var update_education_details = `update education set course_name = ? ,year_ = ?,percentage = ? where id =${edu_id[i]} and emp_id= ${emp_id};`
      var insert_education_details = `insert into education(emp_id,course_name,year_,percentage) value(${emp_id},'${course_name[i]}' ,${passingyear[i]},${percentage[i]})`;

      var query = update_education_details;
      if (!edu_id[i]) {
        query = insert_education_details
      }
      con.query(query, [course_name[i], Number(passingyear[i]), Number(percentage[i])], (error) => {
        if (error) {
          console.log(error)
          return reject(error)
        } else {
          console.log('Education Details Updated')
          return resolve()
        }
      })
    }
  })
}

function update_work(data) {
  console.log(data)
  let { emp_id, workid, companys, workdesignation, fromdates, todates } = data
  return new Promise((resolve, reject) => {
    workid = workid.filter((workid) => workid.length > 1)
    companys = companys.filter((company) => company.length > 1)
    workdesignation = workdesignation.filter((des) => des.length > 1)
    fromdates = fromdates.filter((frmd) => frmd.length == 10)
    todates = todates.filter((tod) => tod.length == 10)
    console.log(workid)
    for (i = 0; i < companys.length; i++) {
      var update_work_details = `update work_experiance set company_name = ? ,designation = ?,from_date = ?,to_date = ? where id =${workid[i]} and emp_id= ${emp_id};`
      var insert_work_experiance = `insert into work_experiance(emp_id,company_name,designation,from_date,to_date) value(${emp_id},'${companys[i]}' ,'${workdesignation[i]}','${fromdates[i]}',' ${todates[i]}')`;

      var query = update_work_details
      if (!workid[i]) {
        query = insert_work_experiance;
      }
      console.log(query)

      con.query(query, [companys[i], workdesignation[i], fromdates[i], todates[i]], (error) => {
        if (error) {
          console.log(error)
          reject()
        } else {
          console.log('work Details Updated')
          resolve()
        }
      })
    }
  })
}

function update_lanugages(data) {
  let { emp_id, languages, language1ability, language2ability, language3ability } = data
  var abilitys = [language1ability, language2ability, language3ability]
  console.log(abilitys)
  return new Promise((resolve, reject) => {
    con.query(`delete from language where emp_id=${emp_id}`, (error, result) => {
      if (error) {
        return reject(error)
        throw error
      }
      else {
        console.log("language Deleted")
      }
    })
    for (let language = 0; language < languages.length; language++) {

      for (let ability = 0; ability < abilitys[language].length; ability++) {

        var insert_language = `insert into language(emp_id,lan_name,ability) value(?,?,?)`;
        con.query(insert_language, [emp_id, languages[language], abilitys[language][ability]], (error) => {
          if (error) {
            console.log(error)
            return reject(error)
          } else {
            console.log('Language updated')
            return resolve()
          }
        })
      }

    }
  })
}

// Update Technologies
function update_technologies(data) {
  return new Promise((resolve, reject) => {
    let { emp_id, technologys, technology1ability, technology2ability, technology3ability, technology4ability } = data
    abilitys = [technology1ability, technology2ability, technology3ability, technology4ability]
    abilitys = abilitys.filter((ability) => ability != null && ability != undefined)
    con.query(`delete from technologies where emp_id=${emp_id}`, (error, result) => {
      if (error) {
        console.log(error)
        return reject(error)
      }
      else {
        console.log("technologies Deleted")
      }
    })
    for (let tech = 0; tech < technologys.length; tech++) {
      var insert_technology = `insert into technologies(emp_id,tech_name,ability) value(?,?,?)`;
      con.query(insert_technology, [emp_id, technologys[tech], abilitys[tech]], (error) => {
        if (error) {
          console.log(error)
          return reject(error)
        } else {
          console.log('Technology updated')
          return resolve()
        }
      })
    }
  })
}

// update reference_contact
function update_reference_contact(data) {

  let { ref_id, emp_id, reference_names, reference_contacts, reference_relations } = data
  reference_id = reference_names.filter((reference_id) => reference_id.length > 1)
  reference_names = reference_names.filter((reference_name) => reference_name.length > 1)
  reference_contacts = reference_contacts.filter((reference_contact) => reference_contact.length > 1)
  reference_relations = reference_relations.filter((reference_relation) => reference_relation.length > 1)
  return new Promise((resolve, reject) => {
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
          return reject(error)
        } else {
          console.log('reference Details Updated')
          return resolve()
        }
      })
    }
  })
}

// preference detail update
function update_preference(data) {
  let { emp_id, p_location, notice_period, expacted_ctc, current_ctc, p_department } = data
  let insert_reference = `insert into preferences(emp_id,pref_city,expected_ctc,current_ctc,notice_period,pref_department) value(${emp_id},'${p_location}' ,${expacted_ctc},${current_ctc},${notice_period},'${p_department}')`;
  let query = `update preferences set pref_city =?, expected_ctc=?,current_ctc=?,notice_period=?,pref_department=? where emp_id = ?`;

  if (!p_location) {
    query = insert_reference
  }
  return new Promise((resolve, reject) => {
    con.query(query, [p_location, expacted_ctc, current_ctc, notice_period, p_department, Number(emp_id),], (error) => {
      if (error) {
        console.log(error)
        return reject(error)
      } else {
        console.log('Preferences Update')
        return resolve()
      }
    })
  })
}

module.exports = { updatebasic_details, update_education, update_work, update_lanugages, update_technologies, update_reference_contact, update_preference }