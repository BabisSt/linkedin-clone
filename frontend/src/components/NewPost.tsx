import React, { useState, ChangeEvent } from "react";
import GenericDialog from "./GenericDialog";
import { PostProps } from "../App";

export default function Post() {
  const [openDial, setOpenDial] = useState(false);
  const [postPhoto, setPostPhoto] = useState("");
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getLoggedInUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const loggedInUser = getLoggedInUser();

  const handleOpenThoughts = () => {
    setOpenDial(!openDial);
  };

  const handleCloseThoughts = () => {
    setOpenDial(false);
  };

  const handlePostTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handlePostText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(event.target.value);
  };

  const handlePost = async () => {
    // Ensure user is logged in
    if (!loggedInUser) {
      setErrorMessage("You must be logged in to create a post.");
      return;
    }

    // Validate input fields
    if (!postTitle.trim() || !postText.trim()) {
      setErrorMessage("Both title and content are required.");
      return;
    }

    const formatDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const postData: PostProps = {
      title: postTitle.trim(),
      content: postText.trim(),
      photo: postPhoto || undefined,
      id: "",
      postTime: formatDate(),
      postedBy: loggedInUser.name,
      postedByAvatar: loggedInUser.avatar,
      likes: "0",
      numberOfComments: "0",
      comments: [],
    };

    try {
      // Send post data to backend
      const response = await fetch(
        `http://localhost:8080/insertPostByUserId/${loggedInUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        setSavedMessage("Post saved successfully!");

        // Reset state
        setPostPhoto("");
        setPostText("");
        setPostTitle("");
        setOpenDial(false);

        const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        savedPosts.push(postData);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
      } else {
        setErrorMessage("Failed to save the post. Please try again.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      setErrorMessage("An error occurred while saving the post.");
    }
  };

  return (
    <div className="flex py-8">
      <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto max-w-lg md:max-w-4xl bg-blue-200 w-full">
        <div className="flex flex-col items-start px-4 py-6 w-full">
          <input
            type="text"
            name="newPost"
            id="newPost"
            className="bg-blue-200 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Share your thoughts"
            onClick={handleOpenThoughts}
          />
        </div>

        <GenericDialog
          open={openDial}
          onClose={handleCloseThoughts}
          title="Create a Post"
          onSave={handlePost}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4  shadow-lg w-full h-full overflow-auto">
            <input
              className="rounded-lg title bg-blue-200 border border-blue-200 p-2 mb-4 outline-none"
              spellCheck="false"
              placeholder="Title"
              type="text"
              onChange={handlePostTitle}
            />
            <textarea
              className="rounded-lg description bg-blue-200 sec p-3 mb-2 h-60 border border-blue-200 outline-none"
              spellCheck="false"
              placeholder="What do you want to talk about?"
              onChange={handlePostText}
            ></textarea>

            {postPhoto && (
              <div className="relative w-full max-w-[100%]">
                {/* <img
                  src={postPhoto}
                  className="rounded-lg w-full h-auto object-cover max-h-60 border border-blue-200"
                  alt="Post Preview"
                /> */}
                <button
                  onClick={() => setPostPhoto("")}
                  className="absolute top-2 right-2 p-1"
                >
                  <svg
                    className="mr-2 cursor-pointer hover:text-gray-700 border border-sky-800 rounded-full p-1 h-7 hover:bg-sky-800 hover:border-blue-200 stroke-sky-800 hover:stroke-blue-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="icons flex text-gray-500 m-2">
              <input
                type="text"
                className="rounded-lg bg-blue-200 border border-blue-200 p-2 outline-none w-full"
                placeholder="Paste image URL here"
                value={postPhoto}
                onChange={(e) => setPostPhoto(e.target.value)}
              />
            </div>

            {errorMessage}
            {savedMessage}
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
