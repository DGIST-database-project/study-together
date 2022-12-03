import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
const Study = ({ match }) => {
  const { id } = useParams();
  //   const [studyId, setStudyId] = useState(parseInt(id));
  const [studyName, setStudyName] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [studyIntro, setStudyIntro] = useState("");
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  //   console.log(id);
  const getStudyDetail = () => {
    axios
      .get(`http://localhost:3001/api/study/detail?id=${id}`)
      .then((response) => {
        console.log(response);
        setStudyName(response.data.name);
        setLeaderId(response.data.leaderId);
        setCourseId(response.data.courseId);
        setStudyIntro(response.data.studyIntro);
        setLeaderName(response.data.leaderName);
      });
  };

  const getPost = () => {
    axios.get(`http://localhost:3001/api/post?id=${id}`).then((response) => {
      setPostList(response.data.postList.reverse());
    });
  };

  const deletePost = (post_id) => {
    // console.log(post_id);
    axios.get(`http://localhost:3001/api/delete?id=${post_id}`);
    getPost();
  };

  const editPost = (post_id) => {
    axios.get(`http://localhost:3001/api/edit?id=${post_id}`);
  };
  //`http://localhost:3001/api/study?id=${id}&pw=${pw}`
  useEffect(() => {
    getStudyDetail();
    getPost();
    // console.log("스터디!");
  }, [id]);
  console.log(postList);
  return (
    <div>
      <div className="header">
        <Link to="/Home">
          <h1 className="head">Dgi-study</h1>
        </Link>
      </div>
      <h1>{studyName}</h1>
      <div>
        <ul>
          <li>과목 : {courseId}</li>
          <li>스터디장 : {leaderId}</li>
          <li>스터디 소개 : {studyIntro}</li>
        </ul>
      </div>
      <div>
        <div>게시글</div>
        <table>
          <th>내용</th>
          <th>작성자</th>
          {postList.map((arr, ind) => (
            <tr>
              <td>{arr[1]}</td>
              <td>{arr[2]}</td>

              {location.state.id == arr[2] ? (
                <button onClick={() => deletePost(arr[0])}>삭제</button>
              ) : (
                <></>
              )}
              {location.state.id == arr[2] ? (
                <button
                  onClick={() =>
                    navigate(`/edit/${arr[0]}`, {
                      state: {
                        id: arr[0],
                        content: arr[1],
                        study_id: id,
                        user: arr[2],
                      },
                    })
                  }
                >
                  수정
                </button>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </table>
      </div>
      <button
        onClick={() =>
          navigate(`/make`, {
            state: {
              study_id: id,
              user: location.state.id,
            },
          })
        }
      >
        게시글 생성
      </button>
    </div>
  );
};

export default Study;
