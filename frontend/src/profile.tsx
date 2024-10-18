import React from "react";
import About from "./components/About";
import ProfileHeader from "./components/ProfilHeader";
import ExperiencePage from "./components/ExperiencePage";

/**
 * TODO: Add title to the data
 */

export default function Profile() {
  return (
    <div>
      <ProfileHeader />
      <About />
      <ExperiencePage />
    </div>
  );
}
