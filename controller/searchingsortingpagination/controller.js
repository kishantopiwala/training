const { con, asyncQuery } = require('../../connection')
const studentlist = (req, res) => {
    const studentid = Number(req.body.studentid);
    let { fname, lname, email, phoneno, city, state } = req.body;
    let orderby = req.query.orderby;
    let sortby = req.query.sortby;
    let recordsinonepage = 200;
    var pagenumber = req.query.pageid;

    if (orderby == undefined || orderby == null || sortby == undefined || sortby == null) {
        orderby = "StudentID"
        sortby = 'asc'
    }

    if (req.query.fname || req.query.state || req.query.lname || req.query.city) {
        fname = req.query.fname;
        state = req.query.state;
        lname = req.query.lname;
        city = req.query.city;
    }

    if (pagenumber <= 0 || pagenumber == null) {
        pagenumber = 1;
    }

    if (pagenumber == 1) {
        var start = 0;
    }
    else {
        var start = (pagenumber - 1) * recordsinonepage;
    }

    let totalpage = 0;

    let selectforpage = `select count(stu_id) as totalrecord from student`;
    if (studentid || fname || lname || email || phoneno || city || state) {
        selectforpage = `select count(stu_id) as totalrecord from student where stu_id like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phoneno like '${phoneno}' 
        or city like '${city}' or state like '${state}'`;
    }

    con.query(selectforpage, (error, result) => {
        if (error) {
            console.log(error)
        }
        totalpage = result[0].totalrecord
    })

    let select = `select stu_id As StudentID,fname As FirstName ,lname As LastName, email As Email,phoneno As MobileNumber,age as Age, gender As Gender, address As Address, city As City,state As  State ,postalcode As PinCode from student limit ${start},${recordsinonepage}`;
    if (orderby) {
        if (sortby) {
            select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender, address As Address, city As City, state As  State,postalcode As PinCode from student order by ${orderby} ${sortby} limit ${start}, ${recordsinonepage}`;
            if (studentid || fname || lname || email || phoneno || city || state) {
                select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
                address As Address, city As City, state As  State,
                postalcode As PinCode from student where stu_id like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phoneno like '${phoneno}' 
                or city like '${city}' or state like '${state}' order by ${orderby} ${sortby} limit ${start}, ${recordsinonepage}`;
            }
        }
    }
    try {
        con.query(select, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/studentlist', { row: row, col: col, pageid: pagenumber, orderby: orderby, sortby: sortby, fname: fname, state: state, city: city, lname: lname, totalpage: Math.ceil(totalpage / recordsinonepage) });
            }
        });
    } catch (error) {
        console.log(error)
        const errormsg = "Somthing Went wrong"
        res.send(errormsg)
    }

}

const attendance = (req, res) => {

    let sort = 0;
    let month = req.query.month;
    let orderby = req.query.orderby;
    let recordsinonepage = 20;
    let pagenumber = req.query.pageid;

    let sortby = 'asc';
    if (sortby) {
        sortby = req.query.sortby;
    }
    if (pagenumber <= 0 || pagenumber == null) {
        pagenumber = 1;
    }

    if (pagenumber == 1) {
        var start = 0;
    }
    else {
        var start = (pagenumber - 1) * recordsinonepage;
    }
    let select = `select stu_id As StudentID,count(stu_id) As TotalPresentDays,round(count(stu_id) *100 / 91,2) As Precentage from attendance where p_a = 1 group by stu_id limit ${start},${recordsinonepage};`
    if (month) {
        select = `select attendance.stu_id As StudentID,fname as Name,count(attendance.stu_id) As TotalPresentDays,round(count(attendance.stu_id)*100 / (select count(a_date) from attendance where month(a_date)=${month} and attendance.stu_id = 1),2) As
        Precentage from attendance LEFT JOIN student on student.stu_id = attendance.stu_id where p_a = 1 and month(a_date) = ${month} group by attendance.stu_id limit ${start},${recordsinonepage};`
        if (orderby) {
            select = `select attendance.stu_id As StudentID,fname as Name,count(attendance.stu_id) As TotalPresentDays,round(count(attendance.stu_id)*100 / (select count(a_date) from attendance where month(a_date)=${month} and attendance.stu_id = 1),2) As
            Precentage from attendance LEFT JOIN student on student.stu_id = attendance.stu_id where p_a = 1 and month(a_date) = ${month} group by attendance.stu_id order by ${orderby} limit ${start},${recordsinonepage} ;`

            if (sortby == 'desc') {
                select = `select attendance.stu_id As StudentID,fname as Name,count(attendance.stu_id) As TotalPresentDays,round(count(attendance.stu_id)*100 / (select count(a_date) from attendance where month(a_date)=${month} and attendance.stu_id = 1),2) As
                Precentage from attendance LEFT JOIN student on student.stu_id = attendance.stu_id where p_a = 1 and month(a_date) = ${month} group by attendance.stu_id order by ${orderby} ${sortby} limit ${start},${recordsinonepage} ;`
                sort = 0
            } else if (sortby == 'asc') {
                select = `select attendance.stu_id As StudentID,fname as Name,count(attendance.stu_id) As TotalPresentDays,round(count(attendance.stu_id)*100 / (select count(a_date) from attendance where month(a_date)=${month} and attendance.stu_id = 1),2) As
                Precentage from attendance LEFT JOIN student on student.stu_id = attendance.stu_id where p_a = 1 and month(a_date) = ${month} group by attendance.stu_id order by ${orderby} ${sortby} limit ${start},${recordsinonepage} ;`
                sort = 1
            }
        }
    }
    try {
        con.query(select, (err, row, col) => {
            if (err) {
                console.log(err)
                res.send("Somthing Went Wrong")
            } else {
                res.render('pages/task8/attendancelist', { row: row, col: col, pageid: pagenumber, orderby: orderby, month: month, sortby: sortby, sort: sort });
            }
        });
    } catch (error) {
        res.send("Somthing Went Wrong")
    }

}

const result = (req, res) => {

    let orderby = req.query.orderby;
    let recordsinonepage = 10;
    let pagenumber = req.query.pageid;

    if (pagenumber <= 0 || pagenumber == null) {
        pagenumber = 1;
    }

    if (pagenumber == 1) {
        var start = 0;
    }
    else {
        var start = (pagenumber - 1) * recordsinonepage;
    }
    let select = `select * ,sum(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,
    sum(TerminalPraticalMarks + PrimilaryPratical +FinalPratical) as TotalPraticalMarks,
    sum(TerminalTheoryMarks+PrimilaryTheory+FinalTheory+TerminalPraticalMarks + PrimilaryPratical +FinalPratical) as TotalMarks
     from
    ( select result.stu_id as StudentID,student.fname as StudentName,
        sum(case when result.ex_id = 1 then result.obtain_theory_marks else 0 End ) as TerminalTheoryMarks,
        sum(case when result.ex_id = 1 then result.obtain_pratical_marks else 0 End) as TerminalPraticalMarks,
        sum(case when result.ex_id = 2 then result.obtain_theory_marks else 0 End) As PrimilaryTheory,
        sum(case when result.ex_id = 2 then result.obtain_pratical_marks else 0 End) As PrimilaryPratical,
        sum(case when result.ex_id = 3 then result.obtain_theory_marks else 0 End) As FinalTheory,
        sum(case when result.ex_id = 3 then result.obtain_pratical_marks else 0 End) As FinalPratical
      from result LEFT JOIN student on result.stu_id = student.stu_id LEFT JOIN subject on result.sub_id = subject.sub_id 
      left join exam on result.ex_id = exam.ex_id Group by StudentID limit ${start},${recordsinonepage}
    ) As t Group by StudentID;`

    try {
        con.query(select, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/resultlist', { row: row, col: col, pageid: pagenumber, orderby: orderby });
            }
        });
    } catch (error) {
        res.send("Something Went wrong")
    }

}

const viewreport = (req, res) => {
    let studentid = Number(req.params.stu_id);
    let StudentName = req.params.stu_name;
    let select = `select * ,(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,
    (TerminalPraticalMarks + PrimilaryPratical +FinalPratical) as TotalPraticalMarks,
    (TerminalTheoryMarks+PrimilaryTheory+FinalTheory+TerminalPraticalMarks + PrimilaryPratical +FinalPratical) as TotalMarks
     from
    (select subject.sub_name AS SubjectName, 
	    sum(case when result.ex_id = 1 then result.obtain_theory_marks else 0 End ) as TerminalTheoryMarks, 
	    sum(case when result.ex_id = 1 then result.obtain_pratical_marks else 0 End ) as TerminalPraticalMarks, 
	    sum(case when result.ex_id = 2 then result.obtain_theory_marks else 0 End ) as PrimilaryTheory,
	    sum(case when result.ex_id = 2 then result.obtain_pratical_marks else 0 End ) as PrimilaryPratical,
	    sum(case when result.ex_id = 3 then result.obtain_theory_marks else 0 End ) as FinalTheory,
	    sum(case when result.ex_id = 3 then result.obtain_pratical_marks else 0 End ) as FinalPratical
    from result 
    left Join student on result.stu_id = student.stu_id 
    Left Join subject on result.sub_id = subject.sub_id
    Left Join exam on result.ex_id = exam.ex_id where result.stu_id = ${studentid} 
    group by subject.sub_name
    ) as t;`

    try {
        con.query(select, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/viewreport', { row: row, col: col, studentid: studentid, StudentName: StudentName });
            }
        });
    } catch (error) {
        res.send("Somthing Went Wrong")
    }

}

const dlimitersearch = (req, res) => {
    let search = req.body.filter;
    let start = 0;
    let recordsinonepage = 50;
    if (search != null) {

        let fnamesymbol = [];
        let lnamesymbol = [];
        let emailsymbol = [];
        let agesymbol = [];
        let mobilesymbol = [];
        let citysymbol = [];
        let dlimiters = /[_$^{}:]/;
        for (let d = 0; d < search.length; d++) {
            if (search[d].match(dlimiters)) {
                switch (search[d]) {
                    case '_':
                        fnamesymbol.push(d);
                        break;
                    case '^':
                        lnamesymbol.push(d);
                        break;
                    case '$':
                        emailsymbol.push(d);
                        break;
                    case '}':
                        agesymbol.push(d);
                        break;
                    case '{':
                        mobilesymbol.push(d);
                        break;
                    case ':':
                        citysymbol.push(d);
                        break;
                    default:
                        break;
                }
            }
        }

        var fname = [];
        var lname = [];
        var email = [];
        var age = [];
        var mobileno = [];
        var city = [];

        function splitvalues(dlimiterssymbols) {
            for (let i = dlimiterssymbols + 1; i < search.length; i++) {
                if (search[i].match(dlimiters)) {
                    return i
                }
            }
        }

        function addvalues(symbol, arrayname) {
            for (let values = 0; values < symbol.length; values++) {
                arrayname.push(search.slice(symbol[values] + 1, splitvalues(symbol[values] + 1)))
            }
        }

        addvalues(fnamesymbol, fname);
        addvalues(lnamesymbol, lname);
        addvalues(emailsymbol, email);
        addvalues(agesymbol, age);
        addvalues(mobilesymbol, mobileno);
        addvalues(citysymbol, city);

        var query = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
        address As Address, city As City, state As State,postalcode As PinCode from student where `

        function addquery(dataarray, stringname) {
            for (let data = 0; data < dataarray.length; data++) {
                if (data == 0) {
                    query += `(`
                }
                if (dataarray.length > 1 && data < dataarray.length - 1) {
                    query += ` ${stringname} like '%${dataarray[data]}%' or`
                }
                else if (data == dataarray.length - 1) {
                    query += ` ${stringname} like '%${dataarray[data]}%' ) and`
                }
                else {
                    query += ` ${stringname} like '%${dataarray[data]}%`
                }
            }
        }

        addquery(fname, 'fname');
        addquery(lname, 'lname');
        addquery(email, 'email');
        addquery(age, 'age');
        addquery(mobileno, 'phoneno');
        addquery(city, 'city')
        query = query.slice(0, -3)

    }

    let select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
                 address As Address, city As City, state As  State,postalcode As PinCode from student limit ${start}, ${recordsinonepage}`;
    if (fname, lname, email, age, mobileno, city != null) {
        con.query(query, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/dlimitersearch', { row: row, col: col, search: search });
            }
        });
    }
    else {
        con.query(select, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/dlimitersearch', { row: row, col: col, search: search });
            }
        });
    }
}

module.exports = { studentlist, attendance, result, viewreport, dlimitersearch };