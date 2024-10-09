import React, { useEffect, useState, MouseEvent } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";

export default function About() {
  const profileData = useProfileContext();
  const [openTopSkillsDialog, setOpenTopSkillsDialog] = useState(false);
  const [openAboutDialog, setOpenAboutDialog] = useState(false);
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState(profileData.userProps[0].topSkills);
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toggleTopSkillsDialog = () => {
    setSavedMessage("");
    setOpenTopSkillsDialog(!openTopSkillsDialog);
  };
  const toggleAboutDialog = () => {
    setSavedMessage("");
    setOpenAboutDialog(!openAboutDialog);
  };
  const handleSaveAbout = () => {
    if (about !== profileData.userProps[0].aboutContent) {
      profileData.userProps[0].aboutContent = about;
      setSavedMessage("Successfully Saved!");
    }
  };

  const handleSaveSkills = () => {
    let foundEmpty = false;
    for (let i = 0; i <= skills.length; i++) {
      if (skills[i] === "") {
        setErrorMessage("Skills can't be empty!");
        foundEmpty = true;
        break;
      }
    }
    if (skills !== profileData.userProps[0].topSkills && !foundEmpty) {
      profileData.userProps[0].topSkills = skills;
      setSavedMessage("Successfully Saved!");
      foundEmpty = false;
      setErrorMessage("");
    }
  };

  // Handler for updating individual skills
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  useEffect(() => {
    setAbout(profileData.userProps[0].aboutContent);
    setSkills(profileData.userProps[0].topSkills);
  }, [profileData]);

  const addSkill = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSavedMessage("");

    const updatedSkills = [...skills];
    updatedSkills[skills.length++] = "";
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 p-4">About</h2>
          <p className="text-sm text-gray-600 text-center text-justify px-5 py-3">
            {profileData.userProps[0].aboutContent}
          </p>
          <button
            onClick={toggleAboutDialog}
            className="absolute top-4 right-4 bg-sky-800 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>

        <div className="shadow-lg rounded-lg bg-blue-200 p-5 m-3 border border-blue-300">
          <button
            onClick={toggleTopSkillsDialog}
            className="float-right top-4 right-4 bg-sky-800 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <h2 className="text-xl font-bold text-gray-900">Top Skills</h2>
          {profileData.userProps[0].topSkills.map((data) => (
            <ul className="list-disc" key={data}>
              <li>{data}</li>
            </ul>
          ))}
        </div>

        <GenericDialog
          open={openAboutDialog}
          onClose={toggleAboutDialog}
          title="Edit About"
          onSave={handleSaveAbout}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
            <textarea
              defaultValue={profileData.userProps[0].aboutContent}
              className="w-full h-56 border border-gray-300 rounded p-2"
              onChange={(e) => setAbout(e.target.value)}
            />
            <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
          </div>
        </GenericDialog>

        <GenericDialog
          open={openTopSkillsDialog}
          onClose={toggleTopSkillsDialog}
          title="Edit Top Skills"
          onSave={handleSaveSkills}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
            <ul className="list-disc px-5 mb-4">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <input
                    type="text"
                    value={skill}
                    className="flex-grow border border-gray-300 rounded p-2 mr-2"
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                  />
                  <button
                    className="p-1"
                    onClick={() => handleDeleteSkill(index)}
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
                  onClick={addSkill}
                >
                  Add Skill
                </button>
              </div>

              <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
              <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
            </ul>
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
