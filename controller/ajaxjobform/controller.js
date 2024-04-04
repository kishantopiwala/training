const { query } = require("express");
const { con } = require("../../connection.js");
const scriptjs = require("../../public/js/task12/script.js");
const { basic_details, education_details, work_details, language, preference, reference_contact, technology, } = require("../commonFunction/employeeinsertfunction.js");
const { select_basic_details, select_education_details, select_work_details, select_languages, select_technologies, select_reference_contacts, select_preferences,
} = require("../commonFunction/employeedatafunctions.js");
const {
  updatebasic_details, update_education, update_work, update_lanugages, update_technologies, update_reference_contact, update_preference, } = require("../commonFunction/employeeupdatefunction.js");

function ajax_jobform(req, res) {
  res.render("pages/task12/jobform");
}
function ajax_submitform(req, res) {
  // const { fname, lname, designation, add1, add2, email, state, city, phoneno, gender, relation_status, dob, pincode } = req.body
  let insert_basic_details = `insert into basic_details(first_name,last_name,email,add1,add2,phone_number,relation_status,dob,state,city,pincode,designation,gender)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?) `;
  console.log(req.body)
  basic_details(insert_basic_details, req.body).then((lastindex) => {
    console.log(lastindex);
    education_details(req.body, res, lastindex);
    work_details(req.body, res, lastindex);
    reference_contact(req.body, res, lastindex);
    preference(req.body, res, lastindex);
    language(req.body, res, lastindex);
    technology(req.body, res, lastindex);
    res.redirect("/task12/employees");
  });
}

function ajax_renderemployee(req, res) {
  res.render("pages/task12/showemployee");
}

async function ajax_showemployees(req, res) {
  var selectemployee =
    "select emp_id,first_name,last_name,email,add1 from basic_details";
  var promise = await new Promise((resolve, reject) => {
    con.query(selectemployee, (error, row, col) => {
      if (error) {
        reject(error);
      } else {
        resolve(row, col);
      }
    });
  });
  res.send(promise);
}

async function ajax_getemployeedetail(req, res) {
  var emp_id = req.params.emp_id;
  var result;
  var basic = await select_basic_details(emp_id);
  var education = await select_education_details(emp_id);
  var work = await select_work_details(emp_id);
  var lang = await select_languages(emp_id);
  var ref = await select_reference_contacts(emp_id);
  var tech = await select_technologies(emp_id);
  var pref = await select_preferences(emp_id);

  result = basic[0];
  result["education_id"] = education.id;
  result["courses"] = education.courses;
  result["years"] = education.years;
  result["percentages"] = education.percentages;
  result["work_ids"] = work.work_ids;
  result["company_names"] = work.company_names;
  result["work_designation"] = work.work_designation;
  result["fromdates"] = work.fromdates;
  result["todates"] = work.todates;
  result["ref_id"] = ref.ref_id;
  result["ref_name"] = ref.ref_name;
  result["ref_contact_number"] = ref.ref_contact_number;
  result["reference_relation"] = ref.reference_relation;
  result["english"] = lang.english;
  result["hindi"] = lang.hindi;
  result["gujarati"] = lang.gujarati;
  result["techid"] = tech.techid;
  result["technames"] = tech.technames;
  result["techability"] = tech.techability;
  result["pref_city"] = pref[0] ? pref[0].pref_city ? pref[0].pref_city : '' : "";
  result["exp_ctc"] = pref[0] ? pref[0].expected_ctc : "";
  result["current_ctc"] = pref[0] ? pref[0].current_ctc : "";
  result["notice"] = pref[0] ? pref[0].notice_period : "";
  result["pref_department"] = pref[0] ? pref[0].pref_department : "";
  console.log(result);
  res.send(result);
}

//  education_details(req,res);

async function ajax_updateemployee(req, res) {
  console.log(req.body)
  try {
    await updatebasic_details(req.body);
    await update_education(req.body)
    await update_work(req.body);
    await update_lanugages(req.body);
    await update_technologies(req.body);
    await update_reference_contact(req.body);
    await update_preference(req.body);
    res.send({
      status: 200,
      msg: "data updated"
    });

  } catch (error) {
    console.log(error)
    res.send({
      status: 401,
      msg: "data not updated"
    });
  }
}

module.exports = {
  ajax_jobform,
  ajax_submitform,
  ajax_showemployees,
  ajax_getemployeedetail,
  ajax_updateemployee,
  ajax_renderemployee,
};
