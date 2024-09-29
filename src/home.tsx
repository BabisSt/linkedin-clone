import React from "react";
import Post from "./components/Post";

/**
 *
 * TODO : grab post from backend-api and map them
 */

//Dummy data , will work for now
const postData = {
  name: "Brad Adams",
  avatar:
    "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  postTime: "22h ago",
  content:
    " Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sitggggggggggggggggggggggggggggggggggggggggggggggggggggg amet!",
  likes: "8",
  comments: "122",
  photo:
    "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
};
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Post
        name={postData.name}
        avatar={postData.avatar}
        postTime={postData.postTime}
        content={postData.content}
        likes={postData.likes}
        comments={postData.comments}
        photo={postData.photo}
      />
    </div>
  );
}
