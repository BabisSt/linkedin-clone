import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };

  return (
    <footer className="bg-sky-800 rounded-lg shadow w-full z-20 border-b border-gray-200 dark:border-gray-600">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <button
            className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            onClick={routeChange}
          >
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              LinkedIn
            </span>
          </button>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
