import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleClickLogout = (e) => {
    axios.get("/api/logout").then((response) => {
      if (response.data.logout == 1) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <Link to="/">
        <h1>DIGISTUDY</h1>
      </Link>

      <div>
        {document.cookie ? (
          <>
            <h1>{document.cookie.split("=")[1]}님 환영합니다</h1>
            <button onClick={handleClickLogout}>로그아웃</button>
          </>
        ) : (
          <div>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
