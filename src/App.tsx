import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./welcomePage";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./unauthorized";
import Footer from "./components/Footer";
import Profile from "./profile";
import "./index.css";

//Dummy data , will work for now
const postData = [
  {
    id: "1",
    name: "Brad Adams",
    avatar:
      "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    postTime: "22h ago",
    content:
      " Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sitggggggggggggggggggggggggggggggggggggggggggggggggggggg amet!",
    likes: "8",
    comments: "122",
    photo:
      "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    name: "Bob Turant",
    avatar:
      "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    postTime: "4h ago",
    content: "gdsgds",
    likes: "78",
    comments: "2",
    photo:
      "https://images.pexels.com/photos/26150745/pexels-photo-26150745.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

export default function App() {
  //to prevent nav, footer appearing in welcomepage
  const [showNavFooter, setShowNavFooter] = useState(
    window.location.pathname !== "/"
  );

  const [avatar, setAvatar] = useState(postData[1].avatar);
  const [BG, setBG] = useState(postData[1].photo);

  return (
    <div className="app-container">
      <BrowserRouter>
        {showNavFooter && (
          <NavBar
            photo={avatar}
            name={postData[1].name}
            setShowNavFooter={setShowNavFooter}
          />
        )}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  name={postData[1].name}
                  avatar={avatar}
                  setAvatar={setAvatar}
                  BG={BG}
                  setBG={setBG}
                />
              }
            />
            <Route
              path="/login"
              element={<Login setShowNavFooter={setShowNavFooter} />}
            />
            <Route
              path="/register"
              element={<Register setShowNavFooter={setShowNavFooter} />}
            />
            <Route
              path="/404"
              element={<Unauthorized setShowNavFooter={setShowNavFooter} />}
            />
            <Route
              path="/home"
              element={<PrivateRoute element={<Home postData={postData} />} />}
            />
          </Routes>
        </div>
        {showNavFooter && <Footer />}
      </BrowserRouter>
    </div>
  );
}
