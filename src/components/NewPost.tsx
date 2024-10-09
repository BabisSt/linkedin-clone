import React, { useState, ChangeEvent } from "react";
import GenericDialog from "./GenericDialog";

export default function Post() {
  const [openDial, setOpenDial] = useState(false);
  const [postPhoto, setPostPhoto] = useState("");
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");

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

  const handlePostPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setPostPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handlePost = () => {
    console.log(postText + " " + postTitle);
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
                <img
                  src={postPhoto}
                  className="rounded-lg w-full h-auto object-cover max-h-60 border border-blue-200 "
                />
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
              <label
                className="block mb-2 text-sm font-medium text-white cursor-pointer"
                htmlFor="file_input"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </label>

              <input
                className="hidden"
                id="file_input"
                type="file"
                accept=".png,.jpg,.jpeg,.gif"
                onChange={handlePostPhoto}
              />
            </div>
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
