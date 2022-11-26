const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
const router = require("../router");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
const mysql = require("mysql");
const { redirect } = require("react-router-dom");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sh12091209",
  database: "study_together",
});
db.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../build"))); // react-app/build를 사용하겠다

app.get("/api/login", (req, res) => {
  const submitted_id = req.query.id;
  const submitted_password = req.query.password;
  const sql = `SELECT * FROM user WHERE user.id = "${submitted_id}" and user.pw = "${submitted_password}"`;
  db.query(sql, (err, result, fields) => {
    if (err) throw err;
    else {
      if (result.length == 0) {
        console.log("다시 확인 해주세요");
        res.json({ login: 0 });
      } else {
        console.log("로그인 성공");
        res.cookie("user", submitted_id, {
          expires: new Date(Date.now() + 900000),
        });
        res.json({ login: 1 });
      }
    }
  });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("user");
  res.json({ logout: 1 });
});

app.get("/api/check", (req, res) => {
  const submittedId = req.query.id;
  const submittedPassword = req.query.password;
  const submittedCheckPassword = req.query.checkPassword;
  const submittedName = req.query.name;
  const submittedStudentNumber = req.query.studentNumber;
  const sql = `SELECT * FROM user WHERE user.id = "${submittedId}"`;
  const insertSql = `INSERT INTO user VALUES("${submittedId}", "${submittedPassword}", "${submittedName}", ${submittedStudentNumber})`;
  db.query(sql, (err, result, fields) => {
    if (err) throw err;
    else {
      if (result.length == 0) {
        if (submittedPassword != submittedCheckPassword) {
          console.log("비밀번호를 다시 확인해주세요");
          res.json({ signup: 2 });
        } else {
          db.query(insertSql, (err, result, fields) => {
            if (err) throw err;
            else {
              console.log("회원가입 완료!");
            }
          });
          res.json({ signup: 1 });
        }
      } else {
        res.json({ signup: 3 });
        console.log("이미 존재하는 아이디");
      }
    }
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
