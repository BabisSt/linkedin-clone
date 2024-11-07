import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/LinkedIn_logo_.png";

interface LoginProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function Login({ setShowNavFooter }: LoginProps) {
  const navigate = useNavigate();
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLoginEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!LoginEmail || !LoginPassword) {
      setLoginError("Email and password cannot be empty.");
      return;
    }

    setLoginError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: LoginEmail, password: LoginPassword }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
        setShowNavFooter(true); // Show nav/footer after login
        navigate("/home");
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    setShowNavFooter(false); // Hide nav/footer on the login page
  }, [setShowNavFooter]);

  const navigateRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/register");
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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                  onChange={handleLoginEmailChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
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
                  onChange={handleLoginPasswordChange}
                  className="bg-blue-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <p className="text-red-500">{loginError}</p>
              <button
                type="submit"
                className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 transition-transform transform active:scale-95"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  onClick={navigateRegister}
                  className="font-medium hover:underline text-primary-500"
                >
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
