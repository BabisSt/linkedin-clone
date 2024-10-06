import React from "react";
import About from "./components/About";
import ProfileHeader from "./components/ProfilHeader";

/**
 * TODO: Add title to the data
 */

export default function Profile() {
  return (
    <div>
      <ProfileHeader />
      {/* About */}
      <About />
    </div>
  );
}
