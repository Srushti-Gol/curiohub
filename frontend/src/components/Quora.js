import React from "react";
import Feed from "./Feed";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import "./css/Quora.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Quora() {
  const [user , setUser] = useState({});
  const handleHeader = (status,user) => {
    if (status) {
      setUser(user); // Set token in local storage
    } 
  };
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/getquestions");
      setPosts(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts initially
  }, []);
  
  return (
    <div className="quora">
      <QuoraHeader onHeader={handleHeader} fetchPosts={fetchPosts}/>
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed user = {user} posts={posts} fetchPosts={fetchPosts}/>
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Quora;
