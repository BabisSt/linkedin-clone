import { useState } from "react";
import React from "react";

export default function WelcomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const toggleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const toggleRegister = () => {
    setOpenRegister(!openRegister);
  };
  return (
    <div>
      <h1 className="flex flex-row justify-center pt-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Linked In
        </span>
      </h1>

      <div className="flex justify-center space-x-8">
        <div className="flex flex-col items-center justify-center p-4">
          <h4 className="text-2xl font-bold dark:text-white">
            Already have an account?
          </h4>
          <button
            onClick={toggleLogin}
            className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4"
          >
            Login
          </button>
          {openLogin && (
            <div>
              <h3>Username</h3>
              <input className="border border-gray-400 rounded px-2 py-1 mt-1 mb-2" />

              <h3>Password</h3>
              <input className="border border-gray-400 rounded px-2 py-1 mt-1" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center p-4 ">
          <h4 className="text-2xl font-bold dark:text-white">
            Else make a new one
          </h4>
          <button
            onClick={toggleRegister}
            className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4"
          >
            Resigter
          </button>
          {openRegister && (
            <div>
              <h3>Username</h3>
              <input className="border border-gray-400 rounded px-2 py-1 mt-1 mb-2" />

              <h3>Password</h3>
              <input className="border border-gray-400 rounded px-2 py-1 mt-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
