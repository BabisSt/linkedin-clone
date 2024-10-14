import React from "react";

interface People {
  avatar: string;
  name: string;
  role: string;
  company: string;
}

const people: People[] = [
  {
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQHaeXnMmfjvyQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706286002081?e=2147483647&v=beta&t=eB6QsKVtfFsKQHBnnR1jUZaiHSJgJOv0d_BOhoiBlxo",
    name: "Bonnie Green",
    role: "Visual Designer",
    company: "Intrasoft",
  },
  {
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQHaeXnMmfjvyQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706286002081?e=2147483647&v=beta&t=eB6QsKVtfFsKQHBnnR1jUZaiHSJgJOv0d_BOhoiBlxo",
    name: "Bonnie Green",
    role: "Visual Designer",
    company: "Intrasoft",
  },
  {
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQHaeXnMmfjvyQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706286002081?e=2147483647&v=beta&t=eB6QsKVtfFsKQHBnnR1jUZaiHSJgJOv0d_BOhoiBlxo",
    name: "Bonnie Green",
    role: "Visual Designer",
    company: "Intrasoft",
  },
  {
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQHaeXnMmfjvyQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706286002081?e=2147483647&v=beta&t=eB6QsKVtfFsKQHBnnR1jUZaiHSJgJOv0d_BOhoiBlxo",
    name: "Bonnie Green",
    role: "Visual Designer",
    company: "Intrasoft",
  },
];
export default function Network() {
  return (
    <div>
      <div className="shadow-lg rounded-lg mx-4 md:mx-auto max-w-lg md:max-w-4xl bg-blue-200 w-full p-4 m-4">
        <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full mb-6">
          Connect with people
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {people.map((person, index) => (
            <div
              className="w-full max-w-xs bg-sky-800 border border-gray-600 rounded-lg shadow  "
              key={index}
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={person.avatar}
                  alt="Photo"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-200 ">
                  {person.name}
                </h5>
                <span className="text-sm text-gray-400 ">{person.role}</span>
                <span className="text-sm text-gray-400 ">
                  at {person.company}
                </span>
                <div className="flex mt-4 md:mt-6">
                  <button className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 transition-transform transform active:scale-95">
                    Add friend
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-sky-800  rounded-md group-hover:bg-opacity-0">
                      Message
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
