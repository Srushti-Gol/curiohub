import React from "react";
import Feed from "./Feed";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import "./css/Quora.css";
import { useState } from "react";

function Quora() {
  const [user , setUser] = useState({});
  const handleHeader = (status,user) => {
    if (status) {
      setUser(user); // Set token in local storage
    } 
  };
  
  return (
    <div className="quora">
      <QuoraHeader onHeader={handleHeader}/>
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed user = {user}/>
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Quora;
