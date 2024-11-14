import React, { useEffect, useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import { Comment } from "../App";

interface postDataProps {
  id: string;
  name: string;
  avatar: string;
  postTime: string;
  content: string;
  likes: number;
  numberOfComments: string;
  photo?: string;
  comments: Comment[];
}

export default function Post({
  id,
  name,
  avatar,
  postTime,
  content,
  likes: initialLikes,
  numberOfComments,
  photo,
}: postDataProps) {
  const [openDial, setOpenDial] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Number(initialLikes));
  const [openComments, setOpenComments] = useState(false);
  const [fetchedComments, setFetchedComments] = useState<Comment[]>([]);

  const navigate = useNavigate();

  const handlePhotoClick = () => {
    setOpenDial(!openDial);
  };

  const handleClose = () => {
    setOpenDial(false);
  };

  const handleLiked = async () => {
    const isLiked = !liked;
    setLiked(isLiked);

    const newLikes = isLiked ? Number(likes) + 1 : Number(likes) - 1;
    setLikes(newLikes);

    try {
      const response = await fetch(
        `http://localhost:8080/updateLikesByPostId/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isLiked),
        }
      );

      if (!response.ok) {
        setLikes(likes);
        console.error("Failed to update likes on the server.");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      setLikes(likes);
    }
  };

  const navigateToUser = (name: string) => {
    navigate("/profile" + `/${name}`);
  };

  const toggleComments = async () => {
    setOpenComments(!openComments);
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getCommentsByPostId/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data: Comment[] = await response.json();
        setFetchedComments(data); // Populate state with fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]); // Run this effect only when `postId` changes
  return (
    <div className="flex">
      <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto max-w-lg md:max-w-4xl bg-blue-200 w-full mb-4">
        <div className="flex flex-col items-start px-4 py-6 w-full">
          <div className="flex items-center justify-between w-full">
            <button onClick={() => navigateToUser(name)}>
              <img
                className="w-12 h-12 rounded-full object-cover shadow mr-3"
                src={avatar}
                alt="avatar"
              />
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full">
              <button onClick={() => navigateToUser(name)}>
                <h2 className="text-lg font-semibold text-gray-900 break-words max-w-full">
                  {name}
                </h2>
              </button>
              <small className="text-sm text-gray-700 sm:ml-4 break-words max-w-full">
                {postTime}
              </small>
            </div>
          </div>
          <button onClick={handlePhotoClick} className="mt-4 w-full">
            <img
              className="rounded-lg h-[24rem] w-full cursor-pointer object-cover"
              src={photo}
              alt="Post"
            />
          </button>
          <Dialog
            open={openDial}
            handler={handlePhotoClick}
            className="flex items-center justify-center backdrop-blur-md fixed inset-0 z-50 bg-transparent"
            onClick={handleClose}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div
              className="fixed inset-0 opacity-50 backdrop-blur-md"
              onClick={handleClose}
            />
            <DialogBody
              className="flex items-center justify-center p-0 bg-transparent"
              onClick={(e) => e.stopPropagation()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <img
                alt="nature"
                className="rounded-lg object-cover object-center max-w-full max-h-full"
                src={photo}
              />
            </DialogBody>
          </Dialog>

          <p className="mt-3 text-gray-700 text-sm break-words max-w-full">
            {content}
          </p>
          <div className="mt-4 flex items-center">
            <div
              className="flex text-gray-700 text-sm mr-3 cursor-pointer"
              onClick={handleLiked}
            >
              <svg
                fill={liked ? "#91ffff" : "none"}
                viewBox="0 0 24 24"
                className="w-8 h-8 mr-1"
                stroke={liked ? "#08a4a7" : "currentColor"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="pt-1">{likes}</span>
            </div>
            <div
              onClick={toggleComments}
              className="flex text-gray-700 text-sm mr-8 cursor-pointer"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-8 h-8 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="pt-1">{numberOfComments}</span>
            </div>
            <div className="flex text-gray-700 text-sm mr-4">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span>share</span>
            </div>
          </div>
          {openComments && <CommentsSection comments={fetchedComments} />}
        </div>
      </div>
    </div>
  );
}
