import React from "react";
import About from "./components/About";
import ProfileHeader from "./components/ProfilHeader";
import Experience from "./components/Experience";

/**
 * TODO: Add title to the data
 */

export default function Profile() {
  return (
    <div>
      <ProfileHeader />
      {/* About */}
      <About />
      <Experience />
    </div>
  );
}
