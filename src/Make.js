import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Make = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { study_id } = useParams();
  console.log("make!: ", location.state);
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    axios.get(
      `http://localhost:3001/api/make?id=${location.state.study_id}&content=${content}&user=${location.state.user}`
    );
    navigate(`/StudyBoardPage`, {
      state: {
        id: location.state.id,
        pw: location.pw,
        name: location.state.name,
        student_number: location.state.student_number,
        track: location.state.track,
        study_name_list: location.state.study_name_list,
        study_name: location.state.study_name,
        leader_id: location.state.leader_id,
        course_id: location.state.course_id,
        number_list: location.number_list,
        study_introduction: location.number_study_introduction,
      },
    });

    // state: {
    //   id: id,
    //   pw: pw,
    //   name: name,
    //   student_number: studentNumber,
    //   track: track,
    //   study_name_list: studyNameList /*스터디 개수를 알기 위해 필요*/,
    //   study_name: studyName,
    //   // study_id: study_id_item,
    //   //   student_number: student_number,
    //   leader_id: leaderId,
    //   course_id: courseId,
    //   number_limit: numberLimit,
    //   study_introduction: studyIntro,
    // },

    // const handleStudy = (
    //   event,
    //   study_id_item,
    //   study_name_item,
    //   leader_id_item,
    //   course_id_item,
    //   student_bumber,
    //   number_limit_item,
    //   study_introduction
    // ) => {
    // event.preventDefault();
    // navigate("/StudyBoardPage", {
    //   state: {
    //     id: id,
    //     pw: pw,
    //     name: name,
    //     student_number: student_number,
    //     track: track,
    //     study_name_list: study_name /*스터디 개수를 알기 위해 필요*/,
    //     study_name: study_name_item,
    //     study_id: study_id_item,
    //     student_number: student_number,
    //     leader_id: leader_id_item,
    //     course_id: course_id_item,
    //     number_limit: number_limit_item,
    //     study_introduction: study_introduction,
    //   },
    // });
    // };
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
