import React, { FormEvent, useState } from "react";
import { Comment } from "../App";

interface CommentsProps {
  comments: Comment[];
}

/**
 * TODO : Remove event: FormEvent preventDefault when I add backend
 * TODO : make insert comment on backend
 */
export default function CommentsSection({ comments }: CommentsProps) {
  const [allComments, setAllComments] = useState(comments);
  const [newCommentContent, setNewCommentContent] = useState("");
  const getLoggedInUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser); // Parse JSON safely
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const loggedInUser = getLoggedInUser();
  const handlePostComment = (event: FormEvent) => {
    event.preventDefault();
    const lastIndex =
      allComments.length > 0
        ? parseInt(allComments[allComments.length - 1].id) + 1
        : 0;

    const newCommentBody: Comment = {
      id: lastIndex.toString(),
      avatar: loggedInUser.avatar,
      name: loggedInUser.name,
      datePosted: "Now",
      content: newCommentContent,
    };

    setAllComments([...allComments, newCommentBody]);
    setNewCommentContent("");
  };

  return (
    <section className="w-full py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({allComments.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handlePostComment}>
          <div className="py-2 px-4 mb-4 bg-blue-300 rounded-lg rounded-t-lg">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              className="px-0 w-full bg-blue-300 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="edit-button top-4 right-4 bg-sky-800 text-white px-5 py-1 mb-2 mr-2 rounded"
          >
            Post comment
          </button>
        </form>
        {allComments.map((comment) => (
          <article
            key={comment.id}
            className="p-6 text-base bg-blue-300 rounded-lg my-2"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={comment.avatar}
                    alt={comment.name}
                  />
                  {comment.name}
                </p>
                <p className="text-sm text-gray-600">
                  <time title={comment.datePosted}>{comment.datePosted}</time>
                </p>
              </div>
            </footer>
            <p className="text-gray-700">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
