import React, { useState , useEffect }   from "react";
import {
  Home,
  AssignmentTurnedInOutlined,
  CloseOutlined,
  FeaturedPlayListOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  ExpandMoreOutlined,
  AccountCircleOutlined,
  Search,
} from "@mui/icons-material";
import "./css/QuoraHeader.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button, Input } from "@mui/material";
import axios from "axios";
import LoginForm from "./LoginForm"; // Import the LoginForm component
import RegisterForm from "./RegisterForm"; // Import the RegisterForm component

function QuoraHeader({ onHeader, fetchPosts  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [user , setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [user, setUser] = useState({});

  const Close = <CloseOutlined />;

  const handleLogin = (status, token , user) => {
    setIsAuthenticated(status);
    if (status) {
      console.log('Storing token:', token);
      setUser(user);
      onHeader(true,user);
      localStorage.setItem('token', token); // Set token in local storage
    } else {
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };      
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        username: user.username
      };
      try {
        console.log("Sending request:", body);
        const response = await axios.post("/addquestions", body, config);
        console.log("Response:", response.data);
        alert(response.data.message);
        setIsModalOpen(false);
        setInputUrl("");
        setQuestion("");
        fetchPosts();
      } catch (error) {
        console.error("Error:", error);
        alert("Error in adding question");
      }
    }
  };
  

  
  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <Home />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlined />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="qHeader__input">
          <Search />
          <Input type="text" placeholder="Search questions" />
        </div>
        {!isAuthenticated ? (
          <div className="qHeader__Rem">
            <LoginForm onLogin={handleLogin} />
            <RegisterForm  />
          </div>
        ) : (
        <div className="qHeader__Rem">
          <AccountCircleOutlined />
           <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <AccountCircleOutlined className="avatar" />
              <div className="modal__scope">
                <PeopleAltOutlined />
                <p>Public</p>
                <ExpandMoreOutlined />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value= {question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)} // Add this line
                    style={{
                      margin: "5px 0",
                      border: "1px solid lightgray",
                      padding: "10px",
                      outline: "2px solid #000",
                    }}
                    placeholder="Optional: include a link that gives context"
                  />

                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={(e) => handleSubmit(e)} type="submit" className="add">
                Add Question
              </button>
            </div>
          </Modal>
        </div>
        )}
      </div>
    </div>
  );
}

export default QuoraHeader;









