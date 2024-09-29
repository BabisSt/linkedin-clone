import React, { ChangeEventHandler, MouseEventHandler } from "react";

/** typescript shenanigans
 * @interface WelcomeButtonProps have to declare all prop types
 */
interface WelcomeButtonProps {
  text: string;
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
  menu: boolean;
  username: string;
  handleUsernameChange: ChangeEventHandler<HTMLInputElement>;
  password: string;
  handlePasswordChange: ChangeEventHandler<HTMLInputElement>;
  error: string;
  handleFunctionality: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
  isRegister?: boolean; // questionmark marks argument as optional
  email?: string;
  handleEmailChange?: ChangeEventHandler<HTMLInputElement>;
  photo?: string;
  handlePhotoChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function WelcomeButton({
  text,
  toggleMenu,
  menu,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  error,
  handleFunctionality,
  buttonText,
  isRegister,
  email,
  handleEmailChange,
  photo,
  handlePhotoChange,
}: WelcomeButtonProps) {
  return (
    <div>
      <button
        onClick={toggleMenu}
        className="font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 
                   transition-transform transform active:scale-95"
      >
        {text}
      </button>
      <div className="bg-cyan-950 rounded-lg shadow">
        {menu && (
          <div className="p-5  animate-fade-in my-6">
            <h3 className="block mb-2 pt-5  font-medium text-gray-900 dark:text-white">
              Username
            </h3>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            <h3 className="block mb-2 pt-5  font-medium text-gray-900 dark:text-white">
              Password
            </h3>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            {isRegister && (
              <div>
                <h3 className="block mb-2 pt-5  font-medium text-gray-900 dark:text-white">
                  Email
                </h3>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
            )}
            {isRegister && (
              <div>
                <h3 className="block mb-2 pt-5 font-medium text-gray-900 dark:text-white">
                  Photo
                </h3>
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                  accept="image/*"
                  required
                />
                <img src={photo} className="rounded-lg" />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleFunctionality}
              className="bg-blue-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mb-4 transition-transform transform active:scale-95"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
