import React from "react";
import About from "./components/About";
import ProfileHeader from "./components/ProfilHeader";
import ExperiencePage from "./components/ExperiencePage";

export default function MyProfile() {
  const getLoggedInUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser); // Parse JSON safely
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const loggedInUser = getLoggedInUser();
  console.log("from profile" + loggedInUser.bg);
  return (
    <div>
      {loggedInUser && (
        <>
          <ProfileHeader loggedInUser={loggedInUser} />
          <About loggedInUser={loggedInUser} />
          <ExperiencePage loggedInUser={loggedInUser} />
        </>
      )}
    </div>
  );
}
