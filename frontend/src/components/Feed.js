// import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";

function Feed({user,posts,fetchPosts}) {  
  return (
    <div className="feed">
      <QuoraBox />
      {
        posts.map((post,index) => (<Post key={index} post = {post} user = {user} fetchPosts = {fetchPosts}/>))
      }
    </div>
  );
}

export default Feed;
