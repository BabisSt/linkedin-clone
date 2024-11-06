import React, { useEffect, useState } from "react";
import logo from "/LinkedIn_logo_.png";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function Register({ setShowNavFooter }: RegisterProps) {
  const navigate = useNavigate();

  const [RegisterFullName, setRegisterFullName] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterUserName, setRegisterUserName] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [RegisterAvatar, setRegisterAvatar] = useState("");
  const [RegisterBg, setRegisterBg] = useState("");
  const [RegisterAboutContent, setRegisterAboutContent] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleRegisterFullNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterFullName(event.target.value);
  };
  const handleRegisterEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterEmail(event.target.value);
  };
  const handleRegisterUserNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterUserName(event.target.value);
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
  const handleRegisterAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterAvatar(event.target.value);
  };
  const handleRegisterBgChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterBg(event.target.value);
  };
  const handleRegisterAboutContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRegisterAboutContent(event.target.value);
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !RegisterFullName ||
      !RegisterEmail ||
      !RegisterUserName ||
      !RegisterPassword ||
      !RegisterConfirmPassword
    ) {
      setRegisterError("Fields cannot be empty.");
      return;
    }
    if (RegisterConfirmPassword !== RegisterPassword) {
      setRegisterError("Passwords must match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: RegisterFullName,
          email: RegisterEmail,
          avatar: RegisterAvatar,
          bg: RegisterBg,
          about_content: RegisterAboutContent,
          username: RegisterUserName,
          password: RegisterPassword,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        setShowNavFooter(true);
        navigate("/home");
      } else {
        setRegisterError("Register failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setRegisterError("An error occurred. Please try again.");
    }
  };

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
          <span className="text-2xl font-bold whitespace-nowrap text-white">
            LinkedIn
          </span>
        </div>

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-sky-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Make a new account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleRegisterEmailChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleRegisterUserNameChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John"
                  required
                />
              </div>

              {/* Fullname */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleRegisterFullNameChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John Smith"
                  required
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  id="avatar"
                  onChange={handleRegisterAvatarChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Link to avatar image"
                />
              </div>

              {/* Background Image URL */}
              <div>
                <label
                  htmlFor="bg"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Background Image URL
                </label>
                <input
                  type="url"
                  name="bg"
                  id="bg"
                  onChange={handleRegisterBgChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Link to background image"
                />
              </div>

              {/* About Content */}
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  About
                </label>
                <textarea
                  name="about"
                  id="about"
                  onChange={handleRegisterAboutContentChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleRegisterPasswordChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleRegisterConfirmPasswordChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <p className="text-red-500">{registerError}</p>
              <button
                type="submit"
                className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center mb-2 transition-transform transform active:scale-95"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={navigateLogin}
                  className="font-medium hover:underline text-primary-500"
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
