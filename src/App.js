// import './App.css';
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Home from "./Home.js";
import CoursePage from "./CoursePage.js";
import StudyBoardPage from "./StudyBoardPage.js";
import Edit from "./Edit.js";
import Make from "./Make.js";
// import Main from './Home.js';
// import Soldier from './Soldier.js';
// import Give_points from './Give_points';
// import Give_n_points from './Give_n_points';
// import Notice from './Notice';
// import Menu from './Menu';
// import Home from './Home.js';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CoursePage" element={<CoursePage />} />
          <Route path="/StudyBoardPage" element={<StudyBoardPage />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/make" element={<Make />} />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
