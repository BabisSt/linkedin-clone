import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./welcomePage";
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
    <div>
      <BrowserRouter>
        {showNavFooter && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
          />
          <Route path="/404" element={<Unauthorized />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
        {showNavFooter && <Footer />}
      </BrowserRouter>
    </div>
  );
}
