import {
  AccountCircleOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";
import ReactHtmlParser from 'html-react-parser'

function LastSeen({ date }) {
  return (
    <div>
      Last seen: <ReactTimeAgo date={date} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function Post({post,user,fetchPosts}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const Close = <CloseOutlined />;


  const handleQuill = (value)=>{
      setAnswer(value);
  }
  
  const handleSubmit= async () => {
    if(post?._id && answer !== ""){
      const config = {
        headers : {
          "Content-Type" : "application/json",
        },
      }
      const body = {
        answer: answer,
        questionId : post?._id,
        userId: user._id
      }
      await axios.post('/addanswers' , body ,config)
      .then((res) => {
        console.log(res.data)
        alert("Answer added successfully")
        setIsModalOpen(false)
        fetchPosts();
      }).catch((e) => {
      console.log(e);
      alert('Error in adding answer')
    });
    }
  }
  
  return (
    <div className="post">
      <div className="post__info">
        <AccountCircleOutlined />
        <h4>currentUser</h4>
        <small><LastSeen date = {post?.createdAt}/></small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{post?.questionName}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="post__btnAnswer"
          >
            Answer
          </button>
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
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by <span className="name">question'sUsername</span> on{" "}
                <span className="name">{new Date(post?.createdAt).toLocaleString()}</span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill value = {answer} onChange={handleQuill} placeholder="Enter your answer" />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {
        <img src={post.questionUrl} alt = "" />
        }
      </div>
      
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {
          post?.allAnswers.length
        } Answers
      </p>
      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
          {
            post?.allAnswers?.map((_a,index)=>(<>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "10px 5px",
            borderTop: "1px solid lightgray",
          }}
          className="post-answer-container"
        >
        <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#888",
                  }}
                  className="post-answered"
                >
                  <AccountCircleOutlined />
                  <div
                    style={{
                      margin: "0px 10px",
                    }}
                    className="post-info"
                  >
                    <p>answer's user name</p>
                    <span><LastSeen date = {_a?.createdAt}/></span>
                  </div>
                </div>
                <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
        </div>
            </>
            ))
          }
          
      </div>
    </div>
  );
}

export default Post;
