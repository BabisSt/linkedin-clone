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
import "./index.css";

export default function App() {
  //to prevent nav, footer appearing in welcomepage
  const [showNavFooter, setShowNavFooter] = useState(
    window.location.pathname !== "/"
  );

  return (
    <div className="app-container">
      <BrowserRouter>
        {showNavFooter && (
          <NavBar
            // userPhoto={
            //   "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            // }
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
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          </Routes>
        </div>
        {showNavFooter && <Footer />}
      </BrowserRouter>
    </div>
  );
}
