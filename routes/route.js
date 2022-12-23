const express = require('express');
const router = express.Router();
const connection = require('./db');


router.get("/", (req, res) => {
  let sql = "SELECT * FROM userinfo";
  connection.query(sql, function (err, result) {
    res.render("index", { context: result });
  });
});

router.post("/", (req, res) => {
  let tic = performance.now();
  let sql = "SELECT * FROM person WHERE PersonID LIKE '%"+req.body.query+"%' OR PersonPhoneNumber LIKE '%"+req.body.query+"%' OR PersonName LIKE '%"+req.body.query+"%'";
  connection.query(sql, function (err, result) {
    res.send({
      response: result,
      exectime: (performance.now()-tic).toFixed(3)
    });
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/registration", (req, res) => {
  res.render("registration");
});
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  res.render("index", { Email: email, Password: password });

});

router.post('/save', (req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO userinfo VALUES(?,?)", [
    req.body.email,
    req.body.password
  ],
    function (err, result) {
      if (err) throw err;
    });
  res.redirect('login');

});

router.get('/faculty', (req, res) => {
  let tic = performance.now();
  let sql = "SELECT FacultyID, FacultyTitle, FacultySalary, FacultyName, person.PersonPhoneNumber as FacultyPhone FROM faculty, person WHERE faculty.PersonID = person.PersonID;"
  connection.query(sql, function (err, result) {
    console.log(result);
    res.render('faculty', {
      faculty: result,
      invalid: false,
      exectime: (performance.now()-tic).toFixed(3)
    });
  });
  // let toc = performance.now();
  // console.log(`Call to faculty page query took ${toc - tic} milliseconds.`);
});

router.get('/student', (req, res) => {
  let tic = performance.now();
  let sql = "SELECT StudentID, StudentGPA, StudentName, person.PersonPhoneNumber as StudentPhone FROM student, person WHERE student.PersonID = person.PersonID;"
  connection.query(sql, function (err, result) {
    res.render('student', { student: result });
  });
  let toc = performance.now();
  console.log(`Call to student page query took ${toc - tic} milliseconds.`);

});
router.get('/intern', (req, res) => {
  res.render('intern');

});

module.exports = router;

