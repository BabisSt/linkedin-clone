import React, { useEffect, useState } from "react";

/**
 * TODO: Add functionality on save,apply buttons
 *
 */
interface Job {
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  level: string;
  about: string;
}

export default function Jobs() {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );
  const [toggledJob, setToggledJob] = useState<Job | null>(null);
  const [saveButtonTexts, setSaveButtonTexts] = useState("Save");
  const toggleJob = (index: number, job: Job) => {
    setActiveButtonIndex(index);
    setToggledJob(job);
  };

  const saveJob = () => {
    let updatedButtonTexts = saveButtonTexts;
    updatedButtonTexts = updatedButtonTexts === "Save" ? "Saved" : "Save";
    setSaveButtonTexts(updatedButtonTexts);
  };

  //Access backend
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/jobs");
        const data: Job[] = await response.json();
        setJobs(data);
        // setSaveButtonTexts(data.map(() => "Connect"));
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
              onClick={() => saveJob()}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-blue-200 rounded-md group-hover:bg-opacity-0">
                {saveButtonTexts}
              </span>
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
