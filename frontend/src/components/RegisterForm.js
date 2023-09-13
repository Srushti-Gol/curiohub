import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import { CloseOutlined, } from "@mui/icons-material";
const Close = <CloseOutlined />;

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "" && email !== "" && password !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        email: email
      }
      await sendmail(body, config);
    }else{
      alert("fill all information")
    }
  }

  const sendmail = async (body, config) => {
    await axios
      .post("/sendmail", body, config)
      .then((res) => {
        console.log(res.data);
      }).catch((e) => {
        setError(e);
      });
  }

  const handelRegister = async () => {
    if (otp === "121103") {
      if (username !== "" && email !== "" && password !== "") {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = {
          username: username,
          email: email,
          password: password,
        }
        await axios
          .post("/register", body, config)
          .then((res) => {
            console.log(res.data);
            alert(res.data.message)
            setIsModalOpen(false)
            window.location.href = "/"
          }).catch((e) => {
            setError(e);
          });
      }else{
        alert("fill all information")
      }
    } else {
      alert("otp is wrong")
    }
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Register</Button>
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
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Send Email</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <p>verify code that is send in your email</p>
            <Input
              type="number"
              placeholder="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />
            <button onClick={handelRegister}>Register</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default RegisterForm;

