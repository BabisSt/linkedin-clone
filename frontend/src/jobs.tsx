import React, { ChangeEvent, useEffect, useState } from "react";
import GenericDialog from "./components/GenericDialog";
import { useProfileContext } from "./context";

/**
 * TODO: Connect apply to job with user,store userid to job
 */
interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  level: string;
  about: string;
  save: string;
}

export default function Jobs() {
  const userInfo = useProfileContext();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );
  const [toggledJob, setToggledJob] = useState<Job | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [postResume, setPostResume] = useState("");

  const handlePostResume = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setPostResume(URL.createObjectURL(event.target.files[0]));
    }
  };

  const toggleApplyDialog = () => {
    setSavedMessage("");
    setOpenApplyDialog(!openApplyDialog);
  };

  const toggleJob = (index: number, job: Job) => {
    setActiveButtonIndex(index);
    setToggledJob(job);
  };

  const handleSaveApplyJob = () => {
    if (postResume === "") {
      setErrorMessage("Upload Resume before saving!");
    } else setSavedMessage("Applied! Good Luck.");
  };
  const saveJob = async (id: string) => {
    const updatedJobs = [...jobs];
    const jobToUpdate = updatedJobs.find((job) => job.id === id);

    if (!jobToUpdate) {
      console.error(`Job with ID ${id} not found.`);
      return;
    }

    const updatedSaveStatus = jobToUpdate.save === "Save" ? "Saved" : "Save";
    jobToUpdate.save = updatedSaveStatus;

    try {
      const response = await fetch(`http://localhost:8080/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ save: updatedSaveStatus }),
      });

      if (response.ok) {
        setJobs(updatedJobs);
      } else {
        console.error("Failed to update the job save status.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Access backend

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/jobs");
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
      <div className="md:sticky md:top-20 shadow-lg rounded-lg bg-blue-200 p-4 m-4 md:col-span-3">
        <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full mb-6">
          Available Jobs
        </h2>

        {jobs.map((job, index) => (
          <div key={index} className="divide-y divide-gray-700">
            <button
              onClick={() => toggleJob(index, job)}
              className={
                activeButtonIndex === index
                  ? "font-semibold w-full text-left bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg pb-3 sm:pb-4 p-2 my-1 transition-transform transform"
                  : "pb-3 sm:pb-4 w-full rounded-lg shadow bg-sky-800 p-2 my-1 hover:bg-sky-600 text-left"
              }
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">
                    {job.title}
                  </p>
                  <p className="text-sm truncate text-gray-400">
                    {job.companyName}
                  </p>
                  <p className="text-sm truncate text-gray-300">
                    {job.location}
                  </p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {toggledJob && (
        <div className="shadow-lg h-auto rounded-lg mx-4 bg-blue-200 col-span-1 md:col-span-7 p-6 m-4">
          <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full mb-6">
            Job Description
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                className="w-12 h-12 rounded-full"
                src={toggledJob.companyLogo}
                alt={`${toggledJob.companyName} logo`}
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {toggledJob.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {toggledJob.companyName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">Location</p>
                <p className="text-sm text-gray-500">{toggledJob.location}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Level</p>
                <p className="text-sm text-gray-500">{toggledJob.level}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">About</p>
              <p className="text-sm text-gray-500">{toggledJob.about}</p>
            </div>
          </div>

          <div className="flex justify-start mt-6 space-x-4">
            <button
              onClick={() => saveJob(toggledJob.id)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-blue-200 rounded-md group-hover:bg-opacity-0">
                {toggledJob.save}
              </span>
            </button>
            <button
              onClick={toggleApplyDialog}
              className="edit-button   top-4 right-4 bg-sky-800 text-white px-5 py-1 mb-2 mr-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <GenericDialog
        open={openApplyDialog}
        onClose={toggleApplyDialog}
        title="Apply to Job"
        onSave={handleSaveApplyJob}
      >
        <div className="editor rounded-lg flex flex-col text-gray-800 border border-blue-200 p-4 shadow-lg w-full h-full overflow-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Info</h2>

          <div className="flex flex-col md:flex-row bg-blue-200 rounded m-2 p-3  items-center">
            <img
              className="w-20 h-20 mb-4 rounded-full shadow-md object-cover"
              src={userInfo.userProps[0].avatar}
              alt="User Avatar"
            />

            <div className="text-center md:text-left md:ml-4">
              <h5 className="text-lg font-semibold text-black">
                {userInfo.userProps[0].name}
              </h5>
              <span className="block text-sm text-sky-500 mt-2">
                {userInfo.userProps[0].email}
              </span>
            </div>
          </div>

          {postResume && (
            <div className="relative w-full max-w-[100%] mt-4">
              <object
                width="100%"
                height="400"
                data={postResume}
                type="application/pdf"
              />
              <button
                onClick={() => setPostResume("")}
                className="absolute top-2 right-2 p-1"
              >
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border border-sky-800 rounded-full p-1 h-7 hover:bg-sky-800 hover:border-blue-200 stroke-sky-800 hover:stroke-blue-200"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <p className="text-blue-400 font-bold pt-2">{savedMessage}</p>
          <p className="text-red-400 font-bold pt-2">{errorMessage}</p>
          <div className="mt-8 w-full text-left">
            <label
              htmlFor="file-input"
              className="cursor-pointer inline-flex w-fit justify-center bg-sky-800 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-sky-600"
            >
              Upload Resume
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handlePostResume}
              />
            </label>
          </div>
        </div>
      </GenericDialog>
    </div>
  );
}
