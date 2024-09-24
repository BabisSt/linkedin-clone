import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); //redirect to another page

  const toggleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const toggleRegister = () => {
    setOpenRegister(!openRegister);
  };

  //Need to specify the event type
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  //check if username and password are empty, else navigate to home
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Username and password cannot be empty.");
    } else {
      setError("");
      navigate("/home");
    }
  };

  return (
    <div>
      <h4 className="flex flex-row justify-center pt-24  text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        Welcome to
      </h4>
      <h1 className="flex flex-row justify-center pt-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Linked In
        </span>
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          <div className="">
            <button
              onClick={toggleLogin}
              className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4"
            >
              Already have an account?
            </button>
            {openLogin && (
              <div>
                <h3>Username</h3>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="border border-gray-400 rounded px-2 py-1 mt-1 mb-2"
                />

                <h3>Password</h3>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border border-gray-400 rounded px-2 py-1 mt-1"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                  onClick={handleLogin}
                  className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4"
                >
                  Login
                </button>
              </div>
            )}
          </div>
          <div className="">
            <button
              onClick={toggleRegister}
              className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4"
            >
              Else make a new one
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
    </div>
  );
}
