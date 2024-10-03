import React, { useEffect, useState } from "react";
import logo from "/LinkedIn_logo_.png";
import { useNavigate } from "react-router-dom";
interface RegisterProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function Register({ setShowNavFooter }: RegisterProps) {
  const navigate = useNavigate();

  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterFirstName, setRegisterFirstName] = useState("");
  const [RegisterLasttName, setRegisterLastName] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [RegisterPhone, setRegisterPhone] = useState("");
  const [registerError, setRegisterError] = useState("");

  //Need to specify the event type
  const handleRegisterEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterEmail(event.target.value);
  };

  const handleRegisterFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterFirstName(event.target.value);
  };

  const handleRegisterLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterLastName(event.target.value);
  };
  const handleRegisterPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterPassword(event.target.value);
  };

  const handleRegisterConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterConfirmPassword(event.target.value);
  };

  const handleRegisterPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterPhone(event.target.value);
  };

  //check if username and password are empty, else navigate to home
  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (
      !RegisterEmail ||
      !RegisterFirstName ||
      !RegisterLasttName ||
      !RegisterPassword ||
      !RegisterConfirmPassword ||
      !RegisterPhone
    )
      setRegisterError("Fields cannot be empty.");
    else if (RegisterConfirmPassword !== RegisterPassword)
      setRegisterError("Passwords must match.");
    else {
      setRegisterError("");
      navigate("/home");
      setShowNavFooter(true);
    }
  };

  //trigger showNavFooter asap, so nav and footer dont show up in 404
  useEffect(() => {
    setShowNavFooter(false);
  }, []);

  const navigateLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/login");
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex pb-16">
          <img src={logo} className="h-8" alt="LinkedIn Logo" />
          <span className=" text-2xl font-bold whitespace-nowrap text-white">
            LinkedIn
          </span>
        </div>

        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-sky-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Make a new account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleRegisterEmailChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firsName"
                  onChange={handleRegisterFirstNameChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleRegisterLastNameChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Smith"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleRegisterPasswordChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleRegisterConfirmPasswordChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="phone-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-7890"
                    required
                    onChange={handleRegisterPhoneChange}
                  />
                </div>
              </div>

              <p className="text-red-500">{registerError}</p>
              <button
                onClick={handleRegister}
                type="submit"
                className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 transition-transform transform active:scale-95"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={navigateLogin}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
