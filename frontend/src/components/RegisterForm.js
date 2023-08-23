import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import {CloseOutlined,} from "@mui/icons-material";
const Close = <CloseOutlined />;

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        };
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
        <br/>
        <Input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br/>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      </Modal>
    </>
    );
  }

  export default RegisterForm;

