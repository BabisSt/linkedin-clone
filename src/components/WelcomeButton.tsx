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
      {menu && (
        <div className="animate-fade-in my-6">
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
            className="border border-gray-400 rounded px-2 py-1 mt-1 mb-5 "
          />
          {isRegister && (
            <div>
              <h3>Email</h3>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-400 rounded px-2 py-1 mt-1 mb-5 "
              />
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
  );
}
