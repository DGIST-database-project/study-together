import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { study_id } = useParams();
  const [content, setContent] = useState(location.state.content);
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    axios.get(
      `http://localhost:3001/api/edit?id=${location.state.id}&content=${content}`
    );
    // navigate(`/study/detail/${location.state.study_id}`, {
    //   state: { id: location.state.user },
    // });
  };
  return (
    <div>
      <h1>게시글 수정</h1>

      <textarea
        rows="5"
        cols="40"
        style={{ resize: "none" }}
        onChange={(e) => handleChange(e)}
      >
        {content}
      </textarea>
      <button onClick={() => handleSubmit()}>수정</button>
    </div>
  );
};

export default Edit;
