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
import { ProfileContext } from "./context";

interface PostProps {
  id: string;
  postTime: string;
  postedBy: string;
  postedByAvatar: string;
  content: string;
  likes: string;
  comments: string;
  photo: string;
}

export interface Experience {
  id: string;
  title: string;
  level: string;
  companyName: string;
  companyLogo: string;
  duration: string;
  location: string;
}

export interface UserProps {
  name: string;
  email: string;
  avatar: string;
  BG: string;
  aboutContent: string;
  postData: PostProps[];
  topSkills: string[];
  experience: Experience[];
}

export interface AppData {
  userProps: UserProps[];
}

export default function App() {
  //to prevent nav, footer appearing in welcomepage
  const [showNavFooter, setShowNavFooter] = useState(
    window.location.pathname !== "/"
  );

  const postData: PostProps[] = [
    {
      id: "1",
      postTime: "22h ago",
      postedBy: "Ao Ao",
      postedByAvatar:
        "data:image/jpeg;base64,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",
      content:
        "Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!",
      likes: "8",
      comments: "122",
      photo:
        "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "2",
      postedBy: "Jpe Dpe",
      postedByAvatar:
        "data:image/jpeg;base64,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",
      postTime: "22h ago",
      content:
        "Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!",
      likes: "8",
      comments: "122",
      photo:
        "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const [profileData] = useState<AppData>({
    userProps: [
      {
        name: "Brad Adams",
        email: "Brad@gmail.com",
        avatar:
          "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        BG: "https://images.pexels.com/photos/26150745/pexels-photo-26150745.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        aboutContent:
          "I am a Software Engineer with over 2 years of professional experience...",
        postData: postData,
        topSkills: ["Java", "Html", "React"],
        experience: [
          {
            id: "1",
            title: "Software Engineer",
            companyName: "Netcompany-Intrasoft",
            companyLogo:
              "https://media.licdn.com/dms/image/v2/D4D0BAQFDO68DiMos_Q/company-logo_100_100/company-logo_100_100/0/1706136980091/netcompany_intrasoft_sa_logo?e=1736380800&v=beta&t=wHeprUKkFdYuLWlcKfoR5Ww_oc4QTn5z2tEdlQ3bbbs",
            duration: "01/10/2023 - Present",

            level: "Full-Time",
            location: "Athens, Attiki",
          },
          {
            id: "2",
            title: "Web Developer - Game Developer",
            companyName: "Conferience.com",
            companyLogo:
              "https://media.licdn.com/dms/image/v2/C4E0BAQEOjfno00gnNg/company-logo_100_100/company-logo_100_100/0/1631302071499?e=1736380800&v=beta&t=yUDEebc0-je11FtVRpcDHNtEAsgj0Gnl9cs0fmjrKMk",
            duration: "03/10/2022 - 07/10/2022",
            level: "Internship",
            location: "Athens, Attiki",
          },
        ],
      },
    ],
  });

  return (
    <div className="app-container">
      <BrowserRouter>
        <ProfileContext.Provider value={profileData}>
          {showNavFooter && <NavBar setShowNavFooter={setShowNavFooter} />}
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
              />
              <Route path="/profile" element={<Profile />} />
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
                element={<PrivateRoute element={<Home />} />}
              />
            </Routes>
          </div>
          {showNavFooter && <Footer />}
        </ProfileContext.Provider>
      </BrowserRouter>
    </div>
  );
}
