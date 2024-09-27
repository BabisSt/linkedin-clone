import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeButton from "./components/WelcomeButton";

/**
 * To show nav footer on main pages
 * (value: boolean): This part indicates that the function takes a single argument named value, which must be of type boolean.
 * => void: This indicates that the function does not return any value (void means no return).
 */
interface WelcomePageProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function WelcomePage({ setShowNavFooter }: WelcomePageProps) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [LoginUsername, setLoginUsername] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [RegisterUsername, setRegisterUsername] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate(); //redirect to another page

  const toggleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const toggleRegister = () => {
    setOpenRegister(!openRegister);
  };

  //Need to specify the event type
  const handleLoginUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginUsername(event.target.value);
  };

  const handleLoginPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginPassword(event.target.value);
  };

  //check if username and password are empty, else navigate to home
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!LoginUsername || !LoginPassword) {
      setLoginError("Username and password cannot be empty.");
    } else {
      setLoginError("");
      navigate("/home");
      setShowNavFooter(true);
    }
  };

  const handleRergisterUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterUsername(event.target.value);
  };

  const handleRegisterPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterPassword(event.target.value);
  };

  const handleRegisterEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterEmail(event.target.value);
  };

  //check if username and password are empty, else navigate to home
  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!RegisterUsername || !RegisterPassword || !RegisterEmail) {
      setRegisterError("Username, password and email cannot be empty.");
    } else {
      setRegisterError("");
      navigate("/home");
      setShowNavFooter(true);
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

      <div className="flex justify-center mt-20">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-3 w-55 md:w-64">
            <WelcomeButton
              text={"Already have an account"}
              toggleMenu={toggleLogin}
              menu={openLogin}
              username={LoginUsername}
              handleUsernameChange={handleLoginUsernameChange}
              password={LoginPassword}
              handlePasswordChange={handleLoginPasswordChange}
              error={loginError}
              handleFunctionality={handleLogin}
              buttonText="Login"
            />
          </div>
          <div className="col-end-7 col-span-2 md:col-end-7 md:col-span-2 w-55 md:w-64">
            <WelcomeButton
              text={"Else make a new one"}
              toggleMenu={toggleRegister}
              menu={openRegister}
              username={RegisterUsername}
              handleUsernameChange={handleRergisterUsernameChange}
              password={RegisterPassword}
              handlePasswordChange={handleRegisterPasswordChange}
              isRegister={true}
              email={RegisterEmail}
              handleEmailChange={handleRegisterEmailChange}
              error={registerError}
              handleFunctionality={handleRegister}
              buttonText="Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
