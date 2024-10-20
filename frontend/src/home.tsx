import React from "react";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import { useProfileContext } from "./context";
import { useNavigate } from "react-router-dom";

/**
 *
 * TODO : grab post from backend-api and map them
 * To accept props as Object type I have to deconstruct the types of the object
 * and then accept this interface as array
 */

export default function Home() {
  const posts = useProfileContext();
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  const routeNetwork = () => {
    navigate("/network");
  };

  const routeJobs = () => {
    navigate("/jobs");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:sticky md:top-20 shadow-md rounded-xl bg-blue-200 h-96 p-6 m-4 md:col-span-3 lg:col-start-2 lg:col-end-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">About You</h2>

        <button onClick={navigateProfile}>
          <img
            className="w-20 h-20 mb-4 rounded-full shadow-md object-cover"
            src={posts.userProps[0].avatar}
            alt="User Avatar"
          />
        </button>

        <button onClick={navigateProfile}>
          <h5 className="text-lg font-semibold text-gray-700">
            {posts.userProps[0].name}
          </h5>
        </button>

        <span className="block text-sm text-gray-500 mt-2">
          {posts.userProps[0].email}
        </span>

        <ul className="space-y-4 mt-4 w-full ">
          <li
            onClick={routeNetwork}
            className=" rounded p-2 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer"
          >
            <span className="font-medium">Network</span>
          </li>
          <li
            onClick={routeJobs}
            className=" rounded p-2 hover:bg-cyan-950 hover:text-white flex justify-between items-center text-gray-900 cursor-pointer"
          >
            <span className="font-medium">Jobs</span>
          </li>
        </ul>
      </div>

      <div className="max-w-full md:max-w-4xl col-span-1 md:col-span-6 lg:col-start-5 lg:col-end-10  p-4 sm:m-4">
        <NewPost />
        {posts.userProps[0].postData.map((data) => (
          <div key={data.id}>
            <Post
              id={data.id}
              name={data.postedBy}
              avatar={data.postedByAvatar}
              postTime={data.postTime}
              content={data.content}
              likes={data.likes}
              numberOfComments={data.numberOfComments}
              photo={data.photo}
              comments={data.comments}
            />
          </div>
        ))}
      </div>
    </div>
  );
}