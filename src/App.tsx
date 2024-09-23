import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import WelcomePage from "./welcomePage";
import "./index.css";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
