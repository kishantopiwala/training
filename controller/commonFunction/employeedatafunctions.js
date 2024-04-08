const { con } = require('../../connection.js');

function select_basic_details(emp_id) {

  let basic_details = 'select * from basic_details where emp_id = ?'
  return new Promise((resolve, reject) => {
    con.query(basic_details, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(result)
      }
    })
  })
}

function select_education_details(emp_id) {

  let education_detail = 'select * from education where emp_id = ?'
  return new Promise((resolve, reject) => {
    con.query(education_detail, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
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

function select_work_details(emp_id) {

  let work_experiance = 'select id,emp_id,company_name,designation,from_date,to_date from work_experiance where emp_id = ?'
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

function select_reference_contacts(emp_id) {

  let reference_contact = 'select id,emp_id,ref_name,ref_contact_number,reference_relation from reference_contact where emp_id = ?'
  return new Promise((resolve, reject) => {
    con.query(reference_contact, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
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

function select_languages(emp_id) {

  let language = 'select * from language where emp_id = ?'
  return new Promise((resolve, reject) => {
    con.query(language, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
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
    })
  })
}
function select_technologies(emp_id) {

  let technologiequery = 'select * from technologies where emp_id = ?'
  return new Promise((resolve, reject) => {

    con.query(technologiequery, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
      } else {
        const techid = result.map((obj) => {
          return obj.tech_id
        })
        const technames = result.map((obj) => {
          return obj.tech_name
        })
        const techability = result.map((obj) => {
          return obj.ability
        })
        console.log(techid)
        return resolve({ techid, technames, techability })
      }
    })
  })
}
function select_preferences(emp_id) {

  let preference = 'select * from preferences where emp_id = ?'
  return new Promise((resolve, reject) => {
    con.query(preference, [emp_id], (error, result) => {
      if (error) {
        return reject(error)
      } else {
        if (result == null) {
          result = []
        }
        return resolve(result)
      }
    })
  })
}

module.exports = { select_basic_details, select_education_details, select_work_details, select_languages, select_technologies, select_reference_contacts, select_preferences }