const { con, asyncQuery } = require('../../connection')
const studentlist = (req, res) => {

    var studentid = Number(req.body.studentid);
    var { fname, lname, email, phoneno, city, state} = req.body;
    var orderby = req.query.orderby;
    var sortby = req.query.sortby;
    let recordsinonepage = 200;
    var pagenumber = req.query.pageid;

    if(orderby == undefined || orderby == null || sortby == undefined || sortby == null){
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

    var select = `select stu_id As StudentID,fname As FirstName ,lname As LastName, email As Email,phoneno As MobileNumber,age as Age, gender As Gender, address As Address, city As City,state As  State ,postalcode As PinCode from student limit ${start},${recordsinonepage}`;
    if (orderby) {
        if(sortby){
            select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender, address As Address, city As City, state As  State,postalcode As PinCode from student order by ${orderby} ${sortby} limit ${start}, ${recordsinonepage}`;  
            if (studentid || fname || lname || email || phoneno || city || state ) {
                select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
                address As Address, city As City, state As  State,
                postalcode As PinCode from student where stu_id like '${studentid}' or fname like '${fname}' or lname like '${lname}' or phoneno like '${phoneno}' 
                or city like '${city}' or state like '${state}' order by ${orderby} ${sortby} limit ${start}, ${recordsinonepage}`;
            }
        }
    }

    con.query(select, (err, row, col) => {
        if (err) {
            throw err
        } else {
            res.render('pages/task8/studentlist', { row: row, col: col, pageid: pagenumber, orderby: orderby, sortby: sortby,fname:fname,state:state,city:city,lname:lname  });
        }
    });
}

const attendance = (req, res) => {

    var sort = 0;
    let month = req.query.month;
    var orderby = req.query.orderby;
    let recordsinonepage = 20;
    var pagenumber = req.query.pageid;

    var sortby = 'asc';
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
    var select = `select stu_id As StudentID,count(stu_id) As TotalPresentDays,round(count(stu_id) *100 / 91,2) As Precentage from attendance where p_a = 1 group by stu_id limit ${start},${recordsinonepage};`
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
    con.query(select, (err, row, col) => {
        if (err) {
            throw err
        } else {
            res.render('pages/task8/attendancelist', { row: row, col: col, pageid: pagenumber, orderby: orderby, month: month, sortby: sortby, sort: sort});
        }
    });
}

const result = (req, res) => {

    var orderby = req.query.orderby;
    let recordsinonepage = 10;
    var pagenumber = req.query.pageid;

    if (pagenumber <= 0 || pagenumber == null) {
        pagenumber = 1;
    }

    if (pagenumber == 1) {
        var start = 0;
    }
    else {
        var start = (pagenumber - 1) * recordsinonepage;
    }
    var select = `select * ,sum(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,
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

    con.query(select, (err, row, col) => {
        if (err) {
            throw err
        } else {
            res.render('pages/task8/resultlist', { row: row, col: col, pageid: pagenumber, orderby: orderby });
            // res.render('pages/resultlist', { row: row, col: col, pageid: pagenumber, orderby: orderby });
        }
    });
}

const viewreport = (req, res) => {
    var studentid = Number(req.params.stu_id);
    var StudentName = req.params.stu_name;
    var select = `select * ,(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,
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
    con.query(select, (err, row, col) => {
        if (err) {
            throw err
        } else {
            res.render('pages/task8/viewreport', { row: row, col: col, studentid: studentid, StudentName: StudentName });
        }
    });
}

const addattendance = (req, res) => {
    for (let id = 1; id <= 200; id++) {
        for (let date = 1; date <= 29; date++) {
            var att = `insert into attendance(stu_id,a_date,p_a) values(${id},"2024-02-${date}",${Math.floor(Math.random() * 2)})`
            con.query(att, (err) => {
                if (err) {
                    throw err
                }
            });
        }
    }
}


const dlimitersearch = (req, res) => {
    var search = req.body.filter;
    var start = 0;
    var recordsinonepage = 50;
    if (search != null) {

        // var fnamesymbol = search.indexOf('_')
        // var lnamesymbol = search.indexOf('^')
        // var emailsymbol = search.indexOf('$')
        // var agesymbol = search.indexOf('}')
        // var mobilesymbol = search.indexOf('{')
        // var citysymbol = search.indexOf(':')
        var fnamesymbol = [];
        var lnamesymbol = [];
        var emailsymbol = [];
        var agesymbol = [];
        var mobilesymbol = [];
        var citysymbol = [];
        var dlimiters = /[_$^{}:]/;
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

        console.log(fnamesymbol, lnamesymbol, emailsymbol, agesymbol, mobilesymbol, citysymbol);
        var searchlength = search.length;
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
        // var fname = search.slice(fnamesymbol + 1, splitvalues(fnamesymbol));
        // var lname = search.slice(lnamesymbol + 1, splitvalues(lnamesymbol));
        // var email = search.slice(emailsymbol + 1, splitvalues(emailsymbol));
        // var age = Number(search.slice(agesymbol + 1, splitvalues(agesymbol)));
        // var mobileno = Number(search.slice(mobilesymbol + 1, splitvalues(mobilesymbol)));
        // var city = search.slice(citysymbol + 1, splitvalues(citysymbol));

        var query = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
        address As Address, city As City, state As State,postalcode As PinCode from student where `

        function addquery(dataarray,stringname) {
            for (let data = 0; data < dataarray.length; data++) {
                console.log(dataarray[data])
                if(data == 0){
                    query += `(`
                }
                if(dataarray.length > 1 && data < dataarray.length-1){
                    query +=` ${stringname} like '%${dataarray[data]}%' or`
                }
                else if(data == dataarray.length-1){
                    query += ` ${stringname} like '%${dataarray[data]}%' ) and`
                }
                else {
                    query +=` ${stringname} like '%${dataarray[data]}%`
                }
            }
        }


        addquery(fname,'fname');
        addquery(lname,'lname');
        addquery(email,'email');
        addquery(age,'age');
        addquery(mobileno,'phoneno');
        addquery(city,'city')
        
        query = query.slice(0,-3)
        console.log(query)
        
    }

    var select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
                 address As Address, city As City, state As  State,postalcode As PinCode from student limit ${start}, ${recordsinonepage}`;
    
                 // select = `select stu_id As StudentID, fname As FirstName, lname As LastName, email As Email, phoneno As MobileNumber,age as Age, gender As Gender,
    //             address As Address, city As City, state As  State,postalcode As PinCode from student where fname like '${fname.join}%' and lname like '%${lname}%' and email like '%${email}' and age like '%${age}%' and phoneno like '%${mobileno}%' 
    //             and city like '%${city}%' limit ${start}, ${recordsinonepage}`;
    if (fname,lname,email,age,mobileno,city != null) {
        con.query(query, (err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/dlimitersearch', { row: row, col: col,search:search });
            }
        });
    }
    else{
        con.query(select,(err, row, col) => {
            if (err) {
                throw err
            } else {
                res.render('pages/task8/dlimitersearch', { row: row, col: col,search:search });
            }
        });
    }
}



module.exports = { studentlist, addattendance, attendance, result, viewreport,dlimitersearch };