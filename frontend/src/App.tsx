import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./welcomePage";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./unauthorized";
import Footer from "./components/Footer";
import MyProfile from "./myProfile";
import Profile from "./profile";
import Jobs from "./jobs";
import "./index.css";
import { ProfileContext } from "./context";
import Network from "./network";

export interface PostProps {
  id: string;
  postTime: string;
  postedBy: string;
  postedByAvatar: string;
  content: string;
  likes: string;
  numberOfComments: string;
  photo: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  avatar: string;
  name: string;
  datePosted: string;
  content: string;
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
  id: string;
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

  // const getLoggedInUser = () => {
  //   const storedUser = localStorage.getItem("user");

  //   if (!storedUser) {
  //     return null;
  //   }

  //   try {
  //     return JSON.parse(storedUser); // Parse JSON safely
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     return null;
  //   }
  // };

  const [appData, setAppData] = useState<AppData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: AppData[] = await response.json();

        setAppData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        {appData && (
          <ProfileContext.Provider value={appData}>
            {showNavFooter && <NavBar setShowNavFooter={setShowNavFooter} />}
            <div className="content">
              <Routes>
                <Route
                  path="/"
                  element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
                />
                <Route
                  path="/profile"
                  element={<PrivateRoute element={<MyProfile />} />}
                />
                <Route path="/profile/:userName" element={<Profile />} />
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
                <Route
                  path="/network"
                  element={<PrivateRoute element={<Network />} />}
                />
                <Route
                  path="/jobs"
                  element={<PrivateRoute element={<Jobs />} />}
                />
              </Routes>
            </div>
            {showNavFooter && <Footer />}
          </ProfileContext.Provider>
        )}
      </BrowserRouter>
    </div>
  );
}
