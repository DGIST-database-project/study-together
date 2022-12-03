import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Make = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { study_id } = useParams();
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    axios.get(
      `http://localhost:3001/api/make?id=${location.state.study_id}&content=${content}&user=${location.state.user}`
    );
    navigate(`/study/detail/${location.state.study_id}`, {
      state: { id: location.state.user },
    });
  };
  return (
    <div>
      <h1>게시글 생성</h1>

      <textarea
        rows="5"
        cols="40"
        style={{ resize: "none" }}
        onChange={(e) => handleChange(e)}
      >
        {/* {content}/ */}
      </textarea>
      <button onClick={() => handleSubmit()}>생성</button>
    </div>
  );
};

export default Make;
