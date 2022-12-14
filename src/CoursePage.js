import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./CoursePage.css"
import dalgu from './dalgu.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Home from './Home';

function CoursePage() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [student_number, setstudent_number] = useState("");
    const [track, setTrack] = useState("");
    const [user_study_name, setuser_study_name] = useState([]);

    const [course_id, setcourse_id] = useState([]);
    const [course_name, setcourse_name] = useState([]);
    const [professor_name, setprofessor_name] = useState([]);

    // 여기서는 Home.js와 다르다!! 
    const [study_id_list, setstudy_id_list] = useState([]);
    const [study_name_list, setstudy_name_list] = useState([]);
    const [study_leader_id_list, setleader_id_list] = useState([]);
    const [study_number_limit_list, setnumber_limit_list] = useState([]);
    const [study_course_id_list, setstudy_course_id_list] = useState([]);
    const [study_introduction_list, setstudy_introduction_list] = useState([]);

    const [study_member_count, setstudy_member_count] = useState("");

    const [study_join_msg, setstudy_join_msg] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const setUp = () => {
        console.log("location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        setName(location.state.name);
        setstudent_number(location.state.student_number);
        setTrack(location.state.track);
        setuser_study_name(location.state.study_name);

        setcourse_id(location.state.course_id);
        setcourse_name(location.state.course_name);
        setprofessor_name(location.state.professor_name);
    };


    const getStudyList = async() => {
        await axios.get(`http://localhost:3001/api/coursepage/studylist?course_id=${course_id}&course_name=${course_name}&professor_name=${professor_name}`)
        .then((response) => {
            console.log("getStudy: ", response.data);
            if(Object.entries(study_name_list).toString() !== "" && Object.entries(study_name_list).toString() === Object.entries(response.data.study_name_list).toString()) {
                console.log("study_name_list is same");
                console.log("study_name_list: ", study_name_list, " and :", Object.entries(study_name_list).toString());
                console.log("response: ", response.data.study_name_list)
            }

            else if(Object.entries(study_name_list).toString() === Object.entries(response.data.study_name_list).toString()){
                console.log("study_name_list is same");
                console.log("study_name_list: ", study_name_list, " and :", Object.entries(study_name_list).toString());
                console.log("response: ", response.data.study_name_list)
            }

            else{
                console.log("study_name_list is same");
                console.log("study_name_list: ", typeof study_name_list);
                console.log("response: ", typeof response.data.study_name_list)
                console.log("result: ", study_name_list === response.data.study_name_list);
                setstudy_id_list(response.data.study_id_list);
                setstudy_name_list(response.data.study_name_list);
                setleader_id_list(response.data.study_leader_id_list);
                setnumber_limit_list(response.data.study_number_limit_list);
                setstudy_course_id_list(response.data.study_course_id_list);
                setstudy_introduction_list(response.data.study_introduction_list);
            }
            
        });
        // console.log("xibal 2 : ", data);
        // setstudy_name_list(data.study_name_list);
        // setleader_id_list(data.study_leader_id_list);
        // setnumber_limit_list(data.study_number_limit_list);
        // setstudy_course_id_list(data.study_course_id_list);
        // setstudy_introduction_list(data.study_introduction_list);
    };

    const getStudyMemberCount = async() => {
        console.log("getStudyMemberCount");
        await axios.get(`http://localhost:3001/api/coursepage/studymembercount?course_id=${location.state.course_id}&course_name=${course_name}&professor_name=${professor_name}`)
        .then((response) => {
            console.log("getStudyMemberCount: ", response.data);
            setstudy_member_count(response.data.studymembercount)
        });
    };

    const handleStudyJoin = async (event, study_id, study_name, leader_id, study_num_limit) => {
        console.log("handleStudyJoin 22");
        // study_id_list[index], current, study_leader_id_list[index], study_number_limit_list[index]
        await axios.get(`http://localhost:3001/api/coursepage/studyjoin`, {
            params: {
                study_id: study_id, 
                study_name: study_name,
                leader_id: leader_id,
                study_num_limit: study_num_limit,
                id: id,
                student_number: student_number
            }
        }).then((response) => {
            console.log("response.data.studyjoin: ", response.data.studyjoin);
            if(response.data.studyjoin === 0) {
                // alert("스터디에 가입되었습니다.");
                setstudy_join_msg("스터디에 가입되었습니다.");
                // navigate("/home", {state: {id: id, pw: pw, name: name, student_number: student_number, track: track, study_name: user_study_name}});
            } else if (response.data.studyjoin === 1){
                // alert("스터디에 가입되지 않았습니다.");
                setstudy_join_msg("해당 스터디에 이미 가입되어있습니다!");
            } else{
                // alert("스터디에 가입되지 않았습니다.");
                setstudy_join_msg("해당 스타디에 인원이 다 차있습니다!");
            }

        });
        console.log("handleStudyJoin 3");
    };


    // "스터디 조회" 버튼을 누르면 스터디 조회 화면으로 이동
    const handleSearch = (event) => {
        const search_study_name = document.getElementById('search_study_name').value;

    };

    useEffect(() => {
        setUp();
        getStudyList();
        getStudyMemberCount();
        // getStudyList();
        console.log("useEffect 1");
    }, [course_id, study_name_list, study_member_count, study_join_msg]);

    // 흠 무한루프를 각오하고 여기 study_name_list를 넣을까..
    // id, pw, course_id, course_name, professor_name, study_name_list, study_leader_id_list

    return (
        <div>
            <div className="header">
				<Link to="/Home" state={{ id: id, pw: pw }}>
					<h1 className="head">Dgi-study</h1>
				</Link>
			</div>

            <div className="course">
                <div className="courseContainer">
                    <div className="text">
                        <h2> 수업에 등록된 스터디 화면 </h2>
                    </div>
                    <div className="study-box">   
                        <Grid container spacing={8}>
                            <Grid item xs={8}>
                            <div className="text">
                                <h2> [{course_id}] {course_name} 수업에 등록된 스터디: {study_member_count}개</h2>
                            </div>    
                            
                            {
                                (study_name_list.length == 0) ? <h2> 아직 등록된 스터디가 없습니다! </h2> :
                               
                                study_name_list.map((current, index) => {
                                    // console.log("hello: ", current);
                                    return(
                                        <div className="study-box-box">

                                            <Card sx={{ display: 'inline-block', maxWidth: 200 , height: 250, textAlign: 'left' }}>
                                                <CardActionArea>
                                                    
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {current}
                                                        </Typography>
                                                        <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                스터디장: {study_leader_id_list[index]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                최대 인원수: {study_number_limit_list[index]}
                                                            </Typography>
                                                            
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                내용: {study_introduction_list[index]}
                                                            </Typography>

                                                            {/* 스터디 페이지 버튼 */}
                                                            
                                                            <div className="btn-space">
                                                                <button className="btn-study" onClick={(event) => handleStudyJoin(event, study_id_list[index],current, study_leader_id_list[index], study_number_limit_list[index])}>스터디 가입</button>
                                                            </div>
                                                            
                                
                                                            
                                                        </Box>
                                                    </CardContent>
                                                    
                                                </CardActionArea>
                                            </Card>
                                            
                                            {/* <h2> {current} </h2>
                                            <div> {leader_id[index]} </div>
                                            <div> {number_limit[index]} </div>
                                            <div> {course_id[index]} </div> */}
                                        </div>
                                    )
                                })
                            }                            
                            <p className='errMsg'>{study_join_msg}</p>

                            </Grid>

                            <Grid item xs={4}>
                                
                                <Card sx={{ maxWidth: 250, columnGap: 3}}>
                                    <CardActionArea>
                                        <img src={ dalgu } width="100" height="100" alt="My Image" />
                                    
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {name}님 환영합니다!
                                            </Typography>
                                            <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    아이디: {id}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    학번: {student_number}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    소속: 기초학부
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    트랙: {track}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    스터디 참가: {user_study_name.length} 개
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>
                                
                                <div className="right-box">
                                    
                                    <Card sx={{maxWidth: 250, height: 180, columnGap: 4}}>
                                    
                                        <div className="text">
                                            <h3> 스터디 조회하기 </h3>
                                        </div>
                                        <div className="input-text-field">
                                            <input id="search_study_name" placeholder="스터디 이름을 입력해주세요..." type="text"/>	
                                            <button className="btn-search" onClick={handleSearch}>스터디 조회</button>
                                            {/* <div className='btn-search'>
                                                <button className="btn-course">등록된 스터디 보기</button>
                                                <Button variant="contained" color="primary" onClick={handleSearch} disableElevation>
                                                    <p>제출하기</p>
                                                </Button>	
                                            </div> */}
                                        
                                        </div>
                                    </Card>

                                    
                                </div>

                            </Grid>

                        </Grid>    
                        
                
                        
                    </div>
                </div>


                {/* 로그아웃 버튼 */}
                <div className="footer">
                    <div className="blank">
                        <Link to="/Home" state={{ id: id, pw: pw }}>
                            <button className="btn-logout">홈 화면</button>
                        </Link>
                        <Link to="/StudyEnrollPage" state={{ 
                            id: id, 
                            pw: pw,
                            name: name,
                            student_number: student_number,
                            track: track,
                            user_study_name: user_study_name,
                            course_id: course_id,
                            course_name: course_name,
                            professor_name: professor_name,

                        }}>
                            <button className="btn-logout">스터디 등록하기</button>
                        </Link>
                        <Link to="/">
                            <button className="btn-logout">로그아웃</button>
                        </Link>
                    </div>
                </div>


            </div>


        </div>
    )

}

export default CoursePage;