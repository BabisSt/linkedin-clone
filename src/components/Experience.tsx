import React, { useEffect, useState } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";
import SingleExperience from "./SingleExperience";

/**
 * TODO : Finish single experience and this one
 */
export default function Experience() {
  const profileData = useProfileContext();
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);
  const [experience, setExperience] = useState(
    profileData.userProps[0].experience
  );
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toggleExperienceDialog = () => {
    setSavedMessage("");
    setOpenExperienceDialog(!openExperienceDialog);
  };

  const handleSaveExperience = () => {
    let foundEmpty = false;
    // for (let i = 0; i <= Object.keys(experience).length; i++) {
    //   if (experience[i] === "") {
    //     setErrorMessage("Experience can't be empty!");
    //     foundEmpty = true;
    //     break;
    //   }
    // }
    if (experience !== profileData.userProps[0].experience && !foundEmpty) {
      profileData.userProps[0].experience = experience;
      setSavedMessage("Successfully Saved!");
      foundEmpty = false;
      setErrorMessage("");
    }
  };

  // Handler for updating individual Experience
  // const handleExperienceChange = (index: number, value: string) => {
  //   const updatedExperience = [...experience];
  //   updatedExperience[index] = value;
  //   setExperience(updatedExperience);
  // };

  useEffect(() => {
    setExperience(profileData.userProps[0].experience);
  }, [profileData]);

  // const addExperience = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setSavedMessage("");

  //   const updatedExperience = [...experience];
  //   updatedExperience[experience.length++] = "";
  //   setExperience(updatedExperience);
  // };

  // const handleDeleteExperience = (index: number) => {
  //   const updatedExperience = [...experience];
  //   updatedExperience.splice(index, 1);
  //   setExperience(updatedExperience);
  // };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
        <div className="shadow-lg rounded-lg bg-blue-200 p-5 m-3 border border-blue-300">
          <button
            onClick={toggleExperienceDialog}
            className="float-right top-4 right-4 bg-sky-800 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <h2 className="text-xl font-bold text-gray-900">Experience</h2>
          {profileData.userProps[0].experience.map((experience) => (
            <ul className="" key={experience.id}>
              <li>
                <SingleExperience singleExperience={experience} />
              </li>
            </ul>
          ))}
        </div>
        {/* <GenericDialog
          open={openExperienceDialog}
          onClose={toggleExperienceDialog}
          title="Edit Experience"
          onSave={handleSaveExperience}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
            <ul className="list-disc px-5 mb-4">
              {experience.map((experience, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <input
                    type="text"
                    value={experince}
                    className="flex-grow border border-gray-300 rounded p-2 mr-2"
                    onChange={(e) =>
                      handleExperienceChange(index, e.target.value)
                    }
                  />
                  <button
                    className="p-1"
                    onClick={() => handleDeleteExperience(index)}
                  >
                    <svg
                      className=" cursor-pointer hover:text-gray-700 border rounded-full  h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
              <div className="flex justify-end">
                <button
                  className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
                  onClick={addExperience}
                >
                  Add Experince
                </button>
              </div>

              <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
              <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
            </ul>
          </div>
        </GenericDialog> */}
      </div>
    </div>
  );
}
