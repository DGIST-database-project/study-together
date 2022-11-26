import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`/api/login?id=${id}&password=${password}`).then((response) => {
      if (response.data.login == 1) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div>
      <Link to="/">
        <h1>DIGISTUDY</h1>
      </Link>
      <form onSubmit={handleLogin}>
        <h2>로그인</h2>
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
