import React, { useEffect, useState } from "react";
import { useProfileContext } from "../context";
import GenericDialog from "./GenericDialog";
import SingleExperience from "./SingleExperience";
import EditButton from "./EditButton";

/**
 * TODO : Fix date picker
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
  const [levelDropdown, setLevelDropdown] = useState(false);

  const toggleExperienceDialog = (index: number) => {
    setSavedMessage("");
    setExperience(allExperience[index]);
    setOpenExperienceDialog(!openExperienceDialog);
  };

  const handleSaveExperience = () => {
    let foundEmpty = false;
    if (!experience.title) {
      setErrorMessage("Title can't be empty!");
      foundEmpty = true;
    } else if (!experience.companyName) {
      setErrorMessage("Company Name can't be empty!");
      foundEmpty = true;
    } else if (!experience.duration) {
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
        (exp) => exp.id === experience.id
      );
      updatedExperiences[index] = experience;

      setAllExperience(updatedExperiences);
      setSavedMessage("Successfully Saved!");
      setErrorMessage("");

      profileData.userProps[0].experience = updatedExperiences;
    }
  };

  const handleExperienceLevelChange = (level: string) => {
    setLevelDropdown(false);
    setExperience({ ...experience, level });
  };

  useEffect(() => {
    setAllExperience(profileData.userProps[0].experience);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative flex flex-col shadow-lg rounded-lg mx-4 max-w-lg md:max-w-4xl w-full mb-4 bg-blue-200">
        <div className="shadow-lg rounded-lg bg-blue-200 p-5 m-3 border border-blue-300">
          <h2 className="text-xl font-bold text-gray-900">Experience</h2>
          {allExperience.map((experience, index) => (
            <ul className="" key={experience.id}>
              <li className="group">
                <EditButton
                  functionality={() => toggleExperienceDialog(index)}
                />
                <SingleExperience singleExperience={experience} />
              </li>
            </ul>
          ))}
          <button
            className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
            onClick={() => console.log("Add Experience")}
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
              {/* Title */}
              <div className="flex flex-col">
                <label className="font-semibold text-blue-200 m-2">Title</label>
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

                <button
                  id="dateRangeButton"
                  data-dropdown-toggle="dateRangeDropdown"
                  data-dropdown-ignore-click-outside-class="datepicker"
                  type="button"
                  className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline"
                >
                  31 Nov <p className="ms-1"> - 31 Dev </p>{" "}
                  <svg
                    className="w-3 h-3 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dateRangeDropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="p-3" aria-labelledby="dateRangeButton">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input
                          name="start"
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Start date"
                        />
                      </div>
                      <span className="mx-2 text-gray-500 dark:text-gray-400">
                        to
                      </span>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input
                          name="end"
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="End date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level */}
              <div className="flex flex-col relative">
                <label className="font-semibold text-blue-200 m-2">Level</label>
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
                          onClick={() => handleExperienceLevelChange("Junior")}
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
            </div>

            <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
            <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
          </div>
        </GenericDialog>
      </div>
    </div>
  );
}
