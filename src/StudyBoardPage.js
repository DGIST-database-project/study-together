import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
import "./StudyBoardPage.css"
import dalgu from './dalgu.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const StudyBoardPage = ({ match }) => {
    // const { study_id } = useParams();
    //   const [studyId, setStudyId] = useState(parseInt(id));
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [track, setTrack] = useState("");
    const [studyNameList, setStudyNameList] = useState([]);

    const [studyName, setStudyName] = useState("");
    const [studyId, setStudyId] = useState("");
    const [leaderId, setLeaderId] = useState("");
    const [numberLimit, setnumberLimit] = useState("");
    const [leaderName, setLeaderName] = useState("");
    const [courseId, setCourseId] = useState("");
    const [studyIntro, setStudyIntro] = useState("");
    const [postList, setPostList] = useState([]);
    const [courseName, setCourseName] = useState("");

    const [content, setContent] = useState("");
    const [presentPeople, setPresentPeople] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    
    const setUp = () => {
        console.log("StudyBoardPage location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        setName(location.state.name);
        setStudentNumber(location.state.student_number);
        setTrack(location.state.track);
        setStudyNameList(location.state.study_name_list);

        setStudyName(location.state.study_name);
        setStudyId(location.state.study_id);
        setLeaderId(location.state.leader_id);
        setnumberLimit(location.state.number_limit);
        // setLeaderName(location.state.leaderName);
        setCourseId(location.state.course_id);
        setStudyIntro(location.state.study_introduction);

    };

    //   console.log(id);
    const getStudyDetail = () => {
        console.log("StudyBoardPage getStudyDetail() 1: ", studyId);
        axios
            .get(`http://localhost:3001/api/studyboardpage/detail?id=${studyId}`)
            .then((response) => {
                console.log("StudyBoardPage getStudyDetail() 2: ", response.data);
            // setStudyName(response.data.name);
            // setLeaderId(response.data.leaderId);
            // setCourseId(response.data.courseId);
            // setStudyIntro(response.data.studyIntro);
            // setLeaderName(response.data.leaderName);
        });
    };
    const getPresentPeople = () => {
        axios
            .get(`http://localhost:3001/api/studyboardpage/people?id=${studyId}`)
            .then((response) => {
                setPresentPeople(response.data.presentPeople);
        });
    };
    
    const getPost = () => {
        axios
            .get(`http://localhost:3001/api/studyboardpage/post?id=${studyId}`)
            .then((response) => {
                setPostList(response.data.postList);
        });
    };
    
    const getCourseName = () => {
        axios
            .get(`http://localhost:3001/api/studyboardpage/coursename?id=${courseId}`)
            .then((response) => {
                setCourseName(response.data.name);
        });
    };
    
    const getName = () => {
        axios
            .get(`http://localhost:3001/api/studyboardpage/name?id=${leaderId}`)
            .then((response) => {
                setName(response.data.name);
            });
    };
    
    const deletePost = (post_id) => {
        // console.log(post_id);
        axios.get(`http://localhost:3001/api/studyboardpage/delete?id=${post_id}`);
        getPost();
    };

    // "????????? ??????" ????????? ????????? ????????? ?????? ???????????? ??????
    const handleSearch = (e) => {
        const search_study_name = document.getElementById("search_study_name")
        .value;
    };

    const handleMake = (e) => {
        if (content.length > 0) {
        setContent("");
        axios.get(
            `http://localhost:3001/api/studyboardpage/make?id=${id}&content=${content}&study_id=${studyId}`
        );
        window.location.reload();
        getPost();
        }
    };

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleEdit = (post_id) => {
        setContent("");

        axios.get(
        `http://localhost:3001/api/studyboardpage/edit?content="${content}"&id=${post_id}`
        );
        window.location.reload();
        getPost();
    };

    //`http://localhost:3001/api/study?id=${id}&pw=${pw}`
    useEffect(() => {
        setUp();
        getPost();
        getPresentPeople();
        getCourseName();
        getName();
        setUp();
        getStudyDetail();
        console.log("useEffect in StudyBoardPage");
        // console.log("?????????!");
    }, ); // [id, pw, leaderId, courseId, studyIntro, leaderName] ?????? ???????????? ?????? ?????????????????? ????????? ??????!
    // console.log(postList);

    return (
        <div>
            <div className="header">
                <Link to="/Home">
                <h1 className="head">Dgi-study</h1>
                </Link>
            </div>

            <div className="studyboard">
                <div className="studyboardContainer">
                    <div className="text">
                        <h2> ????????? ????????? </h2>
                    </div>
                    <div className="studyboard-box">
                        <Grid container spacing={8}>
                            <Grid item xs={8}>
                                <div className="text">
                                    <h2>"{studyName}" ????????? ??????</h2>
                                </div>  

                                <div className="left-box">
                                    <h3> ??????: {courseName}({courseId}) </h3>
                                    <h3> ????????????: {name}({leaderId}) </h3>
                                    <h3> ????????????: {presentPeople} / {numberLimit} </h3>
                                    <h3> ??????: {studyIntro} </h3>
                                </div>

                                <div className="text">
                                    <h2> ????????? </h2>
                                    <div className="left-box">

                                        <table>
                                            <th width="450">??????</th>
                                            <th width="80">?????????</th>
                                            {postList.map((arr, ind) => (
                                            <tr>
                                                <td width="450" height="20">{arr[1]}</td>
                                                <td width="80" height="20">{arr[2]}</td>

                                                {location.state.id == arr[2] ? (
                                                    <button className="btn-s" onClick={() => deletePost(arr[0])}> ?????? </button>
                                                ) : (
                                                    // <button>??????</button>
                                                    <></>
                                                )}
                                                {location.state.id == arr[2] ? (
                                                    <button className="btn-s" onClick={() => { handleEdit(arr[0]); }}> ?????? </button>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>
                                            ))}
                                        </table>

                                    </div>
                                    

                                </div>  
                                <div style={{ display: "flex", position: "relative", left: 50 }}>
                                    <textarea
                                        className="textarea"
                                        placeholder="?????? ???????????? ?????? ?????? ????????? ????????????"
                                        onChange={(e) => handleChange(e)}
                                        style={{ weight: "100px", height: "60px", resize: "none" }}
                                    ></textarea>
                                    <button onClick={(e) => { handleMake(e);}} className="btn-make">
                                        ????????? ??????
                                    </button>
                                </div>                        

                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 250 }}>
                                    <CardActionArea>
                                        <img src={ dalgu } width="100" height="100" alt="My Image" />
                                    
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {name}??? ???????????????!
                                            </Typography>
                                            <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    ?????????: {id}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    ??????: {studentNumber}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    ??????: ????????????
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    ??????: {track}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    ????????? ??????: {studyNameList.length} ???
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                                <div className="right-box">
                                    
                                    <Card sx={{maxWidth: 250, height: 180, columnGap: 4}}>
                                    
                                        <div className="text">
                                            <h3> ????????? ???????????? </h3>
                                        </div>
                                        <div className="input-text-field">
                                            <input id="search_study_name" placeholder="????????? ????????? ??????????????????..." type="text"/>	
                                            <button className="btn-search" onClick={handleSearch}>????????? ??????</button>
                                            {/* <div className='btn-search'>
                                                <button className="btn-course">????????? ????????? ??????</button>
                                                <Button variant="contained" color="primary" onClick={handleSearch} disableElevation>
                                                    <p>????????????</p>
                                                </Button>	
                                            </div> */}
                                        
                                        </div>
                                    </Card>

                                    
                                </div>
                            </Grid>
                        </Grid>



                    </div>
                </div>

                {/* ???????????? ?????? */}
                <div className="footer">
                    <div className="blank">
                        <Link to="/Home" state={{ id: id, pw: pw }}>
                            <button className="btn-logout">??? ??????</button>
                        </Link>
                        <Link to="/">
                            <button className="btn-logout">????????????</button>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
  );
};

export default StudyBoardPage;