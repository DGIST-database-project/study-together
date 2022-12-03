// import './App.css';
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Home from "./Home.js";
import Study from "./Study.js";
import Post from "./Post.js";
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
          <Route path="/study/detail/:id" element={<Study />} />
          <Route path="/post/:id/:ind" element={<Post />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/make" element={<Make />} />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
