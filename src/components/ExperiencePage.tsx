import React, { useEffect, useState } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";
import SingleExperience from "./SingleExperience";
import EditButton from "./EditButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Experience } from "../App";

/**
 * TODO : Fix add and delete experience
 */
export default function ExperiencePage() {
  const profileData = useProfileContext();
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [allExperience, setAllExperience] = useState(
    profileData.userProps[0]?.experience || []
  );
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [levelDropdown, setLevelDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isNewExperience, setIsNewExperience] = useState(false);

  const toggleExperienceDialog = (index: number) => {
    setSavedMessage("");
    const selectedExperience = allExperience[index] || null;
    setExperience(selectedExperience);
    setStartDate(null);
    setEndDate(null);
    setOpenExperienceDialog(!openExperienceDialog);
  };

  const toggleAddExperience = () => {
    setSavedMessage("");
    setIsNewExperience(true);

    let lastIndex;
    if (allExperience.length != 0) {
      const length = allExperience.length - 1;
      lastIndex = parseInt(allExperience[length].id) + 1;
    } else lastIndex = 0;

    const emptyExperience: Experience = {
      id: lastIndex.toString(),
      title: "",
      level: "",
      companyName: "",
      companyLogo: "",
      duration: "",
      location: "",
    };
    setExperience(emptyExperience);
    setOpenExperienceDialog(true);
  };

  const handleExperienceLevelChange = (level: string) => {
    if (experience) {
      setLevelDropdown(false);
      setExperience({ ...experience, level });
    } else {
      console.error("Experience is null or undefined.");
    }
  };

  const handleDeleteExperience = (index: string) => {
    setAllExperience((allExperience) => {
      return allExperience.filter((experience) => experience.id !== index);
    });
    setOpenExperienceDialog(false);
  };

  const handleSaveExperience = () => {
    if (!experience) return;

    let foundEmpty = false;
    if (!experience.title) {
      setErrorMessage("Title can't be empty!");
      foundEmpty = true;
    } else if (!experience.companyName) {
      setErrorMessage("Company Name can't be empty!");
      foundEmpty = true;
    } else if (!startDate || !endDate) {
      setErrorMessage("Duration can't be empty!");
      foundEmpty = true;
    } else if (!experience.level) {
      setErrorMessage("Level can't be empty!");
      foundEmpty = true;
    } else if (!experience.location) {
      setErrorMessage("Location can't be empty!");
      foundEmpty = true;
    }

    if (!foundEmpty) {
      const updatedExperiences = [...allExperience];
      const index = updatedExperiences.findIndex(
        (exp) => exp.id === experience?.id
      );

      if (index === -1) {
        updatedExperiences.push({
          ...experience,
          duration: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
        });
      } else {
        updatedExperiences[index] = {
          ...experience,
          duration: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
        };
      }

      setAllExperience(updatedExperiences);
      setSavedMessage("Successfully Saved!");
      setErrorMessage("");
      profileData.userProps[0].experience = updatedExperiences;

      setOpenExperienceDialog(false);
    }
  };

  useEffect(() => {
    setAllExperience(profileData.userProps[0]?.experience || []);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
        <div className=" rounded-lg bg-blue-200 p-5 m-3  ">
          <h2 className="text-2xl font-bold text-gray-900 ">Experience</h2>
          {allExperience.map((experience, index) => (
            <ul className="" key={experience.id}>
              <li className="group">
                <EditButton
                  functionality={() => {
                    toggleExperienceDialog(index);
                    setIsNewExperience(false);
                  }}
                />
                <SingleExperience singleExperience={experience} />
              </li>
            </ul>
          ))}
          <button
            className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
            onClick={toggleAddExperience}
          >
            Add Experience
          </button>
        </div>

        {/* Dialog for editing an experience */}
        <GenericDialog
          open={openExperienceDialog}
          onClose={() => {
            if (experience) toggleExperienceDialog(parseInt(experience.id) - 1);
          }}
          title="Edit Experience"
          onSave={handleSaveExperience}
        >
          {experience && (
            <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
              <div className="flex flex-col space-y-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="font-semibold text-blue-200 m-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={experience.title}
                    className="border bg-blue-200 rounded p-2"
                    onChange={(e) =>
                      setExperience({ ...experience, title: e.target.value })
                    }
                  />
                </div>
                {/* Company name */}
                <div className="flex flex-col">
                  <label className="font-semibold text-blue-200 m-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={experience.companyName}
                    className="border bg-blue-200 border-gray-300 rounded p-2"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col">
                  <label className="font-semibold text-blue-200 m-2">
                    Duration
                  </label>

                  <div className="flex space-x-2">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="border bg-blue-200 p-2 rounded"
                      placeholderText={
                        experience.duration.substring(0, 10) || "Start date"
                      }
                    />
                    <span>to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="border bg-blue-200 p-2 rounded"
                      placeholderText={
                        experience.duration.substring(13, 23) || "End date"
                      }
                    />
                  </div>
                </div>

                {/* Level */}
                <div className="flex flex-col relative">
                  <label className="font-semibold text-blue-200 m-2">
                    Level
                  </label>
                  <button
                    className="border border-gray-300 rounded p-2 w-full bg-blue-200 hover:bg-sky-800 hover:text-blue-200 text-left text-bold"
                    onClick={() => setLevelDropdown(!levelDropdown)}
                  >
                    {experience.level || "Select Level"}
                  </button>

                  {levelDropdown && (
                    <div
                      id="dropdown-menu"
                      className="z-10 bg-blue-200 divide-y divide-gray-100 rounded-lg shadow w-full mt-2"
                    >
                      <ul className="py-2 text-sm text-gray-700 ">
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Internship")
                            }
                            className="block px-4 py-2 rounded mx-1 hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Internship
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Junior")
                            }
                            className="block px-4 py-2 rounded mx-1  hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Junior
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Associate")
                            }
                            className="block px-4 py-2 rounded mx-1  hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Associate
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Mid-Senior")
                            }
                            className="block px-4 py-2 rounded mx-1 hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Mid-Senior
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Director")
                            }
                            className="block px-4 py-2 rounded mx-1  hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Director
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleExperienceLevelChange("Executive")
                            }
                            className="block px-4 py-2 rounded mx-1  hover:bg-sky-800 hover:text-blue-200 w-full text-left"
                          >
                            Executive
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="font-semibold text-blue-200 m-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={experience.location}
                    className="border bg-blue-200 border-gray-300 rounded p-2"
                    onChange={(e) =>
                      setExperience({ ...experience, location: e.target.value })
                    }
                  />
                </div>
                {!isNewExperience && (
                  <button
                    onClick={() => handleDeleteExperience(experience.id)}
                    className="btn border rounded-lg border-red-300 bg-red-300 w-44 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
                  >
                    Delete Experience
                  </button>
                )}
              </div>

              <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
              <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
            </div>
          )}
        </GenericDialog>
      </div>
    </div>
  );
}
