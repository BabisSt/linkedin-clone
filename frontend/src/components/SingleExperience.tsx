import React from "react";
import { Experience } from "../App";

interface SingleExperienceProps {
  singleExperience: Experience; // Define a prop for singleExperience
}
export default function SingleExperience(
  singleExperience: SingleExperienceProps
) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-sky-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full my-4 p-4">
      <div className="flex-shrink-0">
        <img
          className="object-cover rounded-full border-4 border-sky-500 h-24 w-24 md:h-32 md:w-32 transition-transform duration-300 transform hover:scale-105"
          src={singleExperience.singleExperience.companyLogo}
          alt="Company Logo"
        />
      </div>
      <div className="flex flex-col justify-center md:ml-6 text-center md:text-left mt-4 md:mt-0">
        <h5 className="mb-1 text-2xl font-bold tracking-wide text-white">
          {singleExperience.singleExperience.title}
        </h5>
        <p className="mb-2 text-lg font-semibold text-sky-300">
          {singleExperience.singleExperience.companyName}
        </p>
        <p className="mb-1 text-md text-gray-200">
          {singleExperience.singleExperience.level}
        </p>
        <p className="mb-1 text-md text-gray-200">
          {singleExperience.singleExperience.duration}
        </p>
        <p className="mb-1 text-md text-gray-200">
          {singleExperience.singleExperience.location}
        </p>
      </div>
    </div>
  );
}
