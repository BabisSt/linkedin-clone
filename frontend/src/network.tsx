import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface People {
  id: string;
  avatar: string;
  name: string;
  role: string;
  company: string;
}

export default function Network() {
  const navigate = useNavigate();
  const navigateToUser = (name: string) => {
    navigate("/profile" + `/${name}`);
  };

  //Access backend
  const [people, setPeople] = useState<People[]>([]);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:8080/people");
        const data: People[] = await response.json();
        setPeople(data);
        setButtonTexts(data.map(() => "Connect"));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPeople();
  }, []);

  const [buttonTexts, setButtonTexts] = useState(people.map(() => "Connect"));
  const addFriend = (index: number) => {
    const updatedButtonTexts = [...buttonTexts];
    updatedButtonTexts[index] =
      updatedButtonTexts[index] === "Pending" ? "Connect" : "Pending";
    setButtonTexts(updatedButtonTexts);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
      <div className="md:sticky md:top-20 shadow-lg rounded-lg bg-blue-200 h-72 p-4 m-4 md:col-span-3 lg:col-start-2 lg:col-end-4">
        <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full mb-6">
          Manage my network
        </h2>

        <ul className="space-y-4">
          <li className=" rounded mx-1 px-2 py-1 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer">
            <span className="font-medium">Connections</span>
          </li>
          <li className=" rounded mx-1 px-2 py-1 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer">
            <span className="font-medium">Contacts</span>
          </li>
          <li className=" rounded mx-1 px-2 py-1 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer">
            <span className="font-medium">Groups</span>
          </li>
          <li className=" rounded mx-1 px-2 py-1 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer">
            <span className="font-medium">Pages</span>
          </li>
        </ul>
      </div>

      <div className="shadow-lg rounded-lg mx-4 md:mx-auto max-w-full md:max-w-4xl bg-blue-200 col-span-1 md:col-span-6 lg:col-span-6 w-full p-4 m-4">
        <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full mb-6">
          Connect with people
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {people.map((person, index) => (
            <div
              className="w-full max-w-xs bg-sky-800 border border-gray-600 rounded-lg shadow"
              key={index}
            >
              <div className="flex flex-col items-center pb-10">
                <button onClick={() => navigateToUser(person.name)}>
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={person.avatar}
                    alt="Photo"
                  />
                </button>
                <button onClick={() => navigateToUser(person.name)}>
                  <h5 className="mb-1 text-xl font-medium text-gray-200">
                    {person.name}
                  </h5>
                </button>
                <span className="text-sm text-gray-400">{person.role}</span>
                <span className="text-sm text-gray-400">
                  at {person.company}
                </span>
                <div className="flex mt-4 md:mt-6">
                  <button
                    onClick={() => addFriend(index)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-sky-800 rounded-md group-hover:bg-opacity-0">
                      {buttonTexts[index]}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
