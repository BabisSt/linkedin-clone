import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/LinkedIn_logo_.png";
import userImage from "/user.png";

/**
 * TODO: Add email to the data
 */
interface NavBarProps {
  setShowNavFooter: (value: boolean) => void;
  photo?: string;
  name: string;
}

export default function NavBar({ setShowNavFooter, name, photo }: NavBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const routeHome = () => {
    navigate("/home");
  };

  const routeNetwork = () => {
    navigate("/network");
  };

  const routeJobs = () => {
    navigate("/jobs");
  };

  const routeContact = () => {
    navigate("/contact");
  };

  const routeProfile = () => {
    navigate("/profile");
  };

  const routeSettings = () => {
    navigate("/settings");
  };

  const routeNotifications = () => {
    navigate("/notifications");
  };

  const Logout = () => {
    setShowNavFooter(false);
    navigate("/");
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getButtonClass = (path: string) =>
    location.pathname === path
      ? " font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-2.5 text-center transition-transform transform"
      : "block font-semibold p-2.5 rounded text-white hover:bg-cyan-950 ";

  return (
    <div>
      <nav className="bg-sky-800 fixed rounded-lg shadow w-full z-20 top-0 start-0 border-b border-gray-200 border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            className="flex flex-wrap items-center justify-between"
            onClick={routeHome}
          >
            <img src={logo} className="h-8" alt="LinkedIn Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              LinkedIn
            </span>
          </button>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <button
              type="button"
              className="flex text-sm bg-blue-200 rounded-full md:me-0 ring-2 focus:ring-4 focus:ring-cyan-950 focus:ring-cyan-950"
              id="user-menu-button"
              aria-expanded={isUserMenuOpen}
              onClick={toggleUserMenu}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={photo ? photo : userImage}
              />
            </button>

            <div
              ref={userMenuRef}
              className={`absolute left-0 top-full mt-2 z-50 ${
                isUserMenuOpen ? "block" : "hidden"
              } text-base list-none  divide-y  rounded-lg shadow bg-sky-700 divide-gray-600 w-auto`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 text-white">
                  {name}
                </span>
                <span className="block text-sm  truncate text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={routeProfile}
                    className=" px-4 py-2 text-sm  text-gray-200 hover:text-white"
                  >
                    Profile
                  </button>
                </li>
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={routeJobs}
                    className=" px-4 py-2 text-sm  text-gray-200 hover:text-white"
                  >
                    Jobs
                  </button>
                </li>
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={routeNetwork}
                    className=" px-4 py-2 text-sm  text-gray-200 hover:text-white"
                  >
                    Network
                  </button>
                </li>
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={routeSettings}
                    className=" px-4 py-2 text-sm text-gray-200 hover:text-white"
                  >
                    Settings
                  </button>
                </li>
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={routeNotifications}
                    className=" px-4 py-2 text-sm text-gray-200 hover:text-white"
                  >
                    Notifications
                  </button>
                </li>
                <li className="rounded mx-1 hover:bg-cyan-950">
                  <button
                    onClick={Logout}
                    className=" px-4 py-2 text-sm text-gray-200 hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
              <li className="">
                <button onClick={routeHome} className={getButtonClass("/home")}>
                  Home
                </button>
              </li>
              <li className="">
                <button
                  onClick={routeNetwork}
                  className={getButtonClass("/network")}
                >
                  Network
                </button>
              </li>
              <li className="">
                <button onClick={routeJobs} className={getButtonClass("/jobs")}>
                  Jobs
                </button>
              </li>
              <li className="">
                <button
                  onClick={routeContact}
                  className={getButtonClass("/contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
