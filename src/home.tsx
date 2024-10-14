import React from "react";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import { useProfileContext } from "./context";

/**
 *
 * TODO : grab post from backend-api and map them
 * To accept props as Object type I have to deconstruct the types of the object
 * and then accept this interface as array
 */

export default function Home() {
  const posts = useProfileContext();
  return (
    <div>
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
      ;
    </div>
  );
}
