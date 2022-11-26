import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState(0);
  const [errMessage, setErrMessage] = useState(0);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .get(
        `api/check?id=${id}&password=${password}&checkPassword=${checkPassword}&name=${name}&studentNumber=${studentNumber}`
      )
      .then((response) => {
        if (response.data.signup == 1) {
          navigate("/");
        } else if (response.data.signup == 2) {
          setErrMessage(2);
          console.log("비밀번호를 다시 확인해주세요");
        } else if (response.data.signup == 3) {
          setErrMessage(3);
          console.log("이미 존재하는 아이디입니다");
        }
      });
  };
  return (
    <>
      <Link to="/">
        <h1>DIGISTUDY</h1>
      </Link>
      <form onSubmit={handleSignUp}>
        <h2>회원가입</h2>
        {errMessage >= 2 ? (
          errMessage == 2 ? (
            <div>비밀번호를 다시 확인해주세요</div>
          ) : (
            <div>이미 존재하는 아이디입니다</div>
          )
        ) : (
          <div></div>
        )}
        <label for="id">ID</label>
        <input
          type="text"
          id="id"
          onChange={(e) => setId(e.target.value)}
          required
        ></input>
        <br />
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <br />
        <label for="checkPassword">비밀번호 확인</label>
        <input
          type="password"
          id="checkPassword"
          onChange={(e) => setCheckPassword(e.target.value)}
          required
        ></input>
        <br />
        <label for="name">이름</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <br />
        <label for="studentNumber">학번</label>
        <input
          type="text"
          id="studentNumber"
          onChange={(e) => setStudentNumber(e.target.value)}
          required
        ></input>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default Signup;