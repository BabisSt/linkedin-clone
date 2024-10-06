import React, { useEffect, useState } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";

/**
 * TODO : add functionality to add more skills
 */
export default function About() {
  const profileData = useProfileContext();
  const [openTopSkillsDialog, setOpenTopSkillsDialog] = useState(false);
  const [openAboutDialog, setOpenAboutDialog] = useState(false);
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState(profileData.userProps[0].topSkills);
  const [savedMessage, setSavedMessage] = useState("");

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
    if (skills !== profileData.userProps[0].topSkills) {
      profileData.userProps[0].topSkills = skills;
      setSavedMessage("Successfully Saved!");
    }
  };

  // Handler for updating individual skills
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value; // Update the specific skill
    setSkills(updatedSkills); // Update the state
  };

  useEffect(() => {
    setAbout(profileData.userProps[0].aboutContent);
    setSkills(profileData.userProps[0].topSkills);
  }, [profileData]);

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
            className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>

        <div className="shadow-lg rounded-lg bg-blue-200 p-5 m-3 border border-blue-300">
          <button
            onClick={toggleTopSkillsDialog}
            className="float-right top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded"
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
            <p className="text-blue-200 font-semibold">{savedMessage}</p>
          </div>
        </GenericDialog>

        <GenericDialog
          open={openTopSkillsDialog}
          onClose={toggleTopSkillsDialog}
          title="Edit Top Skills"
          onSave={handleSaveSkills}
        >
          <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
            <ul className="list-disc px-5">
              {skills.map((skill, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={skill} // Use value instead of defaultValue
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    onChange={(e) => handleSkillChange(index, e.target.value)} // Call handler on change
                  />
                </li>
              ))}
              <p className="text-blue-200 font-semibold">{savedMessage}</p>
            </ul>
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
