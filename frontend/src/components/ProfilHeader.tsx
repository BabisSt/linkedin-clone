import React, { ChangeEvent, useEffect, useState } from "react";
import { useProfileContext } from "../context";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { UserProps } from "../App";

/**
 * TODO : use GenericDialog for dialogs
 * TODO : uselocal storage to get the clicked data here
 */

interface ProfileHeaderProps {
  loggedInUser: UserProps;
}
export default function ProfileHeader({ loggedInUser }: ProfileHeaderProps) {
  const [openAvatarDial, setOpenAvatarDial] = useState(false);
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [openBGDial, setOpenBGDial] = useState(false);
  const [BGPhoto, setBGPhoto] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const handleAvatarPhotoClick = () => {
    setOpenAvatarDial(!openAvatarDial);
  };

  const handleAvatarClose = () => {
    setOpenAvatarDial(false);
    setSavedMessage("");
  };

  const handlePostAvatarPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSavedMessage("");
      const newAvatar = URL.createObjectURL(event.target.files[0]);
      setAvatarPhoto(newAvatar);
    }
  };

  const handleSaveAvatarPhoto = () => {
    if (avatarPhoto !== loggedInUser.avatar) {
      loggedInUser.avatar = avatarPhoto;
      setSavedMessage("Successfully Saved!");
    }
  };

  const handleBGPhotoClick = () => {
    setOpenBGDial(!openBGDial);
  };

  const handleBGClose = () => {
    setOpenBGDial(false);
    setSavedMessage("");
  };

  const handlePostBGPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSavedMessage("");
      const newBG = URL.createObjectURL(event.target.files[0]);
      setBGPhoto(newBG);
    }
  };

  const handleSaveBGPhoto = () => {
    if (BGPhoto !== loggedInUser.bg) {
      loggedInUser.bg = BGPhoto;
      setSavedMessage("Successfully Saved!");
    }
  };

  useEffect(() => {
    setAvatarPhoto(loggedInUser.avatar);
    setBGPhoto(loggedInUser.bg);
  }, [loggedInUser]);

  return (
    <div>
      <div className="flex justify-center items-center w-full mt-10">
        <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
          <button onClick={handleBGPhotoClick}>
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden z-0">
              <img
                src={loggedInUser.bg}
                alt="Background"
                className="w-full h-full object-cover p-1 rounded-t-lg"
              />
            </div>
          </button>

          <div className="relative flex flex-col items-center -mt-20 z-10">
            <button onClick={handleAvatarPhotoClick}>
              <img
                className="w-40 h-40 rounded-full border-4 border-sky-700 shadow-lg object-cover cursor-pointer"
                src={avatarPhoto}
                alt="Profile Avatar"
              />
            </button>

            <div className="text-center my-4">
              <h2 className="text-2xl font-bold text-gray-900 my-2">
                {loggedInUser.name}
              </h2>
              <p className="text-sm text-gray-600">
                Software Engineer at Netcompany-Intrasoft
              </p>
            </div>
          </div>

          {/* Avatar DIAL */}
          <Dialog
            open={openAvatarDial}
            handler={handleAvatarPhotoClick}
            className="flex justify-center backdrop-blur-md fixed inset-0 z-50 bg-transparent w-full "
            onClick={handleAvatarClose}
            placeholder={undefined}
          >
            <div
              className="fixed inset-0 opacity-50 backdrop-blur-md w-full"
              onClick={handleAvatarClose}
            />
            <DialogBody
              className="relative md:w-[40%] h-[60%] w-[100%]  flex flex-col"
              onClick={(e) => e.stopPropagation()}
              placeholder={undefined}
            >
              <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
                <img
                  className="rounded-lg h-[24rem] w-full cursor-pointer object-cover"
                  src={avatarPhoto} // Use avatarPhoto state for the dialog image source
                  alt="Post"
                />

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
                    onChange={handlePostAvatarPhoto}
                  />
                </div>
                <p className="text-blue-200 font-semibold">{savedMessage}</p>
              </div>

              <div className="absolute bottom-0 left-0 w-full flex justify-end p-7 ">
                <button
                  onClick={handleAvatarClose}
                  className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveAvatarPhoto}
                  className="p-1 px-4 ml-2 font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-center transition-transform transform"
                >
                  Save
                </button>
              </div>
            </DialogBody>
          </Dialog>

          {/* Background DIAL */}
          <Dialog
            open={openBGDial}
            handler={handleBGPhotoClick}
            className="flex justify-center backdrop-blur-md fixed inset-0 z-50 bg-transparent w-full "
            onClick={handleBGClose}
            placeholder={undefined}
          >
            <div
              className="fixed inset-0 opacity-50 backdrop-blur-md w-full"
              onClick={handleBGClose}
            />
            <DialogBody
              className="relative md:w-[40%] h-[60%] w-[100%]  flex flex-col"
              onClick={(e) => e.stopPropagation()}
              placeholder={undefined}
            >
              <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
                <img
                  className="rounded-lg h-[24rem] w-full cursor-pointer object-cover"
                  src={BGPhoto} // Use BGPhoto state for the dialog image source
                  alt="Post"
                />

                <div className="icons flex text-gray-500 m-2">
                  <label
                    className="block mb-2 text-sm font-medium text-white cursor-pointer"
                    htmlFor="bg_file_input"
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
                    id="bg_file_input"
                    type="file"
                    accept=".png,.jpg,.jpeg,.gif"
                    onChange={handlePostBGPhoto}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full flex justify-end p-7 ">
                <button
                  onClick={handleBGClose}
                  className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveBGPhoto}
                  className="p-1 px-4 ml-2 font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-center transition-transform transform"
                >
                  Save
                </button>
              </div>
            </DialogBody>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
