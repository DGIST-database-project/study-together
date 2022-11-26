import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/home";
import Signup from "./signup/signup";
import Login from "./login/login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
