import React, { useEffect, useState } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
function Feed({user}) {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios
    .get('/getquestions')
    .then((res)=>{
      console.log(res.data);
      setPosts(res.data.reverse());
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])
  return (
    <div className="feed">
      <QuoraBox />
      {
        posts.map((post,index) => (<Post key={index} post = {post} user = {user}/>))
      }
    </div>
  );
}

export default Feed;
