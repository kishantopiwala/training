const { con } = require('../../connection.js');
function basic_details(query, data) {
  return new Promise((resolve, reject) => {
    con.query(query, [data.fname, data.lname, data.email, data.add1, data.add2, data.phoneno, data.relation_status, data.dob, data.state, data.city, data.pincode, data.designation, data.gender], (error, result) => {
      if (error) {
        reject(error)
        console.log(error)
        res.send("Error in inserting Data")
      }
      else {
        return resolve(result.insertId)
      }
    })
  })
}

function education_details(data, res, lastindex) {
  return new Promise((resolve, reject) => {
    let { course_name, passingyear, percentage } = data;
    course_name = course_name.filter((course) => course.length > 1)
    passingyear = passingyear.filter((year) => year.length > 1)
    percentage = percentage.filter((percent) => percent > 0)

    for (i = 0; i < course_name.length; i++) {
      var insert_education_details = `insert into education(emp_id,course_name,year_,percentage) value(?,?,?,?)`;
      con.query(insert_education_details, [lastindex, course_name[i], passingyear[i], percentage[i]], (error) => {
        if (error) {
          console.log(error)
          res.send("Error in inserting Data")
        } else {
          console.log('Education Details Added')
          return resolve()
        }
      })
    }
  })
}

function work_details(data, res, lastindex) {
  let { companys, workdesignation, fromdates, todates } = data
  return new Promise((resolve, reject) => {
    companys = companys.filter((company) => company.length > 1)
    workdesignation = workdesignation.filter((des) => des.length > 1)
    fromdates = fromdates.filter((frmd) => frmd.length == 10)
    todates = todates.filter((tod) => tod.length == 10)

    for (i = 0; i < companys.length; i++) {
      var insert_work_experiance = `insert into work_experiance(emp_id,company_name,designation,from_date,to_date) value(?,?,?,?,?)`;
      con.query(insert_work_experiance, [lastindex, companys[i], workdesignation[i], fromdates[i], todates[i]], (error) => {
        if (error) {
          console.log(error)
          res.send("Error in inserting Data")
        } else {
          console.log('Work Details Added')
          return resolve()
        }
      })
    }
  })
}

function reference_contact(data, res, lastindex) {
  return new Promise((resolve, reject) => {

    let { reference_names, reference_contacts, reference_relations } = data
    reference_names = reference_names.filter((reference_name) => reference_name.length > 1)
    reference_contacts = reference_contacts.filter((reference_contact) => reference_contact.length > 1)
    reference_relations = reference_relations.filter((reference_relation) => reference_relation.length > 1)

    for (i = 0; i < reference_names.length; i++) {
      var insert_reference = `insert into reference_contact(emp_id,ref_name,ref_contact_number,reference_relation) value(?,?,?,?)`;
      con.query(insert_reference, [lastindex, reference_names[i], reference_contacts[i], reference_relations[i]], (error) => {
        if (error) {
          console.log(error)
          res.send("Error in inserting Data")
        } else {
          console.log('References Added')
          return resolve()
        }
      })
    }
  })
}

function preference(data, res, lastindex) {
  let { p_location, notice_period, expacted_ctc, current_ctc, p_department } = data
  return new Promise((resolve, reject) => {
    var insert_reference = `insert into preferences(emp_id,pref_city,expected_ctc,current_ctc,notice_period,pref_department) value(?,?,?,?,?,?)`;
    con.query(insert_reference, [lastindex, p_location, expacted_ctc, current_ctc, notice_period, p_department], (error) => {
      if (error) {
        console.log(error)
        res.send("Error in inserting Data")
      } else {
        console.log('Preferences Added')
        return resolve()
      }
    })
  })
}


function language(data, res, lastindex) {

  let { languages, language1ability, language2ability, language3ability } = data
  return new Promise((resolve, reject) => {
    let abilitys = [language1ability, language2ability, language3ability]
    console.log(language1ability)
    for (let language = 0; language < languages.length; language++) {
      for (let ability = 0; ability < abilitys[language].length; ability++) {
        var insert_language = `insert into language(emp_id,lan_name,ability) value(?,?,?)`;
        con.query(insert_language, [lastindex, languages[language], abilitys[language][ability]], (error) => {
          if (error) {
            console.log(error)
            res.send("Error in inserting Data")
          } else {
            console.log('Language Added')
            return resolve;
          }
        })
      }
    }
  })
}


function technology(data, res, lastindex) {
  return new Promise((resolve, reject) => {
    let { technologys, technology1ability, technology2ability, technology3ability, technology4ability } = data
    let abilitys = [technology1ability, technology2ability, technology3ability, technology4ability]
    abilitys = abilitys.filter((ability) => ability != null && ability != undefined)
    for (let tech = 0; tech < technologys.length; tech++) {
      var insert_reference = `insert into technologies(emp_id,tech_name,ability) value(${lastindex},'${technologys[tech]}','${abilitys[tech]}')`;
      con.query(insert_reference, [lastindex, technologys[tech], abilitys[tech]], (error) => {
        if (error) {
          console.log(error)
          res.send("Error in inserting Data")
        } else {
          console.log('Technology Added')
          return resolve()
        }
      })
    }
  })
}

module.exports = { basic_details, education_details, work_details, language, preference, reference_contact, technology }