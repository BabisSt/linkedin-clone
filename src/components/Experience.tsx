import React, { useEffect, useState } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";
import SingleExperience from "./SingleExperience";
import EditButton from "./EditButton";

/**
 * TODO : handle delete experience, have to update index
 * TODO : handle add new experience
 * TODO : needs more styling
 */
export default function Experience() {
  const profileData = useProfileContext();
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);
  const [experience, setExperience] = useState(
    profileData.userProps[0].experience[0]
  );
  const [allExperience, setAllExperience] = useState(
    profileData.userProps[0].experience
  );
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle the dialog for editing experience
  const toggleExperienceDialog = (index: number) => {
    setSavedMessage("");
    setExperience(allExperience[index]);
    setOpenExperienceDialog(!openExperienceDialog);
  };

  // Handle saving the updated experience list
  const handleSaveExperience = () => {
    let foundEmpty = false;
    if (!experience.title) {
      setErrorMessage("Experience title can't be empty!");
      foundEmpty = true;
    }

    if (!foundEmpty) {
      // Update allExperience state with the new experience
      const updatedExperiences = [...allExperience];
      const index = updatedExperiences.findIndex(
        (exp) => exp.id === experience.id
      );
      updatedExperiences[index] = experience;

      setAllExperience(updatedExperiences);
      setSavedMessage("Successfully Saved!");
      setErrorMessage("");

      // Update the context (optional, depends on your structure)
      profileData.userProps[0].experience = updatedExperiences;
    }
  };

  // Handler for updating individual experience title
  const handleExperienceTitleChange = (index: number, value: string) => {
    const updatedExperience = { ...experience, title: value };
    setExperience(updatedExperience);
  };
  const handleExperienceCompanyNameChange = (index: number, value: string) => {
    const updatedExperience = { ...experience, companyName: value };
    setExperience(updatedExperience);
  };
  const handleExperienceDurationChange = (index: number, value: string) => {
    const updatedExperience = { ...experience, duration: value };
    setExperience(updatedExperience);
  };
  const handleExperienceLevelChange = (index: number, value: string) => {
    const updatedExperience = { ...experience, level: value };
    setExperience(updatedExperience);
  };
  const handleExperienceLocationChange = (index: number, value: string) => {
    const updatedExperience = { ...experience, location: value };
    setExperience(updatedExperience);
  };

  useEffect(() => {
    setAllExperience(profileData.userProps[0].experience);
  }, []);

  const addExperience = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic for adding a new experience (if required)
  };

  const handleDeleteExperience = (index: number) => {
    console.log(index);
    const updatedExperience = [...allExperience];
    updatedExperience.splice(index, 1);
    setAllExperience(updatedExperience);
    setOpenExperienceDialog(false);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
        <div className="shadow-lg rounded-lg bg-blue-200 p-5 m-3 border border-blue-300">
          <h2 className="text-xl font-bold text-gray-900">Experience</h2>
          {allExperience.map((experience, index) => (
            <ul className="" key={experience.id}>
              <li className="group">
                <EditButton
                  functionality={() => toggleExperienceDialog(index)} // Use index to toggle dialog
                />
                <SingleExperience singleExperience={experience} />
              </li>
            </ul>
          ))}
          <button
            className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>

        {/* Dialog for editing an experience */}
        <GenericDialog
          open={openExperienceDialog}
          onClose={() => toggleExperienceDialog(parseInt(experience.id) - 1)}
          title="Edit Experience"
          onSave={handleSaveExperience}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  value={experience.title}
                  className="border border-gray-300 rounded p-2"
                  onChange={(e) =>
                    handleExperienceTitleChange(
                      parseInt(experience.id) - 1,
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={experience.companyName}
                  className="border border-gray-300 rounded p-2"
                  onChange={(e) =>
                    handleExperienceCompanyNameChange(
                      parseInt(experience.id) - 1,
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Duration</label>
                <input
                  type="text"
                  value={experience.duration}
                  className="border border-gray-300 rounded p-2"
                  onChange={(e) =>
                    handleExperienceDurationChange(
                      parseInt(experience.id) - 1,
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Level</label>
                <input
                  type="text"
                  value={experience.level}
                  className="border border-gray-300 rounded p-2"
                  onChange={(e) =>
                    handleExperienceLevelChange(
                      parseInt(experience.id) - 1,
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  value={experience.location}
                  className="border border-gray-300 rounded p-2"
                  onChange={(e) =>
                    handleExperienceLocationChange(
                      parseInt(experience.id) - 1,
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <button
              className="p-1"
              onClick={() =>
                handleDeleteExperience(parseInt(experience.id) - 1)
              }
            >
              <svg
                className="cursor-pointer hover:text-gray-700 border rounded-full h-7"
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
            <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
            <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
