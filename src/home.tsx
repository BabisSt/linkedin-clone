import React from "react";
import Post from "./components/Post";
import NewPost from "./components/NewPost";

/**
 *
 * TODO : grab post from backend-api and map them
 */

//Dummy data , will work for now
const postData = [
  {
    id: "1",
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
  },
  {
    id: "2",
    name: "ok",
    avatar:
      "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    postTime: "4h ago",
    content: "gdsgds",
    likes: "78",
    comments: "2",
    photo:
      "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  },
];

export default function Home() {
  return (
    <div>
      <NewPost />
      {postData.map((data) => (
        <div key={data.id}>
          <Post
            id={data.id}
            name={data.name}
            avatar={data.avatar}
            postTime={data.postTime}
            content={data.content}
            likes={data.likes}
            comments={data.comments}
            photo={data.photo}
          />
        </div>
      ))}
      ;
    </div>
  );
}
