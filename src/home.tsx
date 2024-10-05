import React from "react";
import Post from "./components/Post";
import NewPost from "./components/NewPost";

/**
 *
 * TODO : grab post from backend-api and map them
 * To accept props as Object type I have to deconstruct the types of the object
 * and then accept this interface as array
 */

interface postDataProps {
  id: string;
  name: string;
  avatar: string;
  postTime: string;
  content: string;
  likes: string;
  comments: string;
  photo?: string;
}

interface homeProps {
  postData: postDataProps[];
}
export default function Home({ postData }: homeProps) {
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
