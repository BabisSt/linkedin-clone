import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import About from "./components/About";
import ProfileHeader from "./components/ProfilHeader";
import ExperiencePage from "./components/ExperiencePage";
import { UserProps } from "./App";

export default function Profile() {
  const { userName } = useParams<{ userName: string }>();
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      try {
        const idResponse = await fetch(
          `http://localhost:8080/users/username/${userName}`
        );
        if (!idResponse.ok) {
          throw new Error("Failed to fetch user ID");
        }
        const userId = await idResponse.text();

        const dataResponse = await fetch(
          `http://localhost:8080/users/${userId}`
        );
        if (!dataResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData: UserProps = await dataResponse.json();
        setUserData(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchUserIdAndData();
    }
  }, [userName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user found.</div>;
  }

  return (
    <div>
      <ProfileHeader loggedInUser={userData} />
      <About loggedInUser={userData} />
      <ExperiencePage loggedInUser={userData} />
    </div>
  );
}
