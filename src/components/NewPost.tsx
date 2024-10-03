import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

export default function Post() {
  const [openDial, setOpenDial] = useState(false);

  const handleOpenThoughts = () => {
    setOpenDial(!openDial);
  };

  const handleCloseThoughts = () => {
    setOpenDial(false);
  };
  return (
    <div className="flex py-8">
      <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto max-w-lg md:max-w-4xl bg-blue-200 w-full">
        <div className="flex flex-col items-start px-4 py-6 w-full">
          <input
            type="text"
            name="newPost"
            id="newPost"
            className="bg-blue-200 border  text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="Share your thoughts"
            onClick={handleOpenThoughts}
          />
        </div>
        <Dialog
          open={openDial}
          handler={handleOpenThoughts}
          className="flex items-center justify-center backdrop-blur-md fixed inset-0 z-50 bg-transparent"
          onClick={handleCloseThoughts}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-md"
            onClick={handleCloseThoughts}
          />

          <DialogBody
            className=""
            onClick={(e) => e.stopPropagation()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg max-w-2xl">
              <input
                className=" rounded-lg title bg-blue-200 border border-blue-200 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Title"
                type="text"
              />
              <textarea
                className=" rounded-lg description bg-blue-200 sec p-3 h-60 border border-blue-200 outline-none"
                spellCheck="false"
                placeholder="What do you want to talk about?"
              ></textarea>

              <div className="icons flex text-gray-500 m-2">
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </div>

              <div className="buttons flex">
                <button
                  onClick={handleCloseThoughts}
                  className="btn border rounded-lg border-blue-200 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                >
                  Close
                </button>
                <button className="p-1 px-4 ml-2 font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-center transition-transform transform">
                  Post
                </button>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
}
