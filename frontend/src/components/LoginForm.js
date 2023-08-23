import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import { CloseOutlined } from "@mui/icons-material";

const Close = <CloseOutlined />;

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (email !== '' && password !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post('/login', body, config);
        const { token , user } = response.data; // Extract token from response data
        localStorage.setItem('token', token); // Store token in local storage
        setIsModalOpen(false);
        setIsLoading(false);
        onLogin(true, token , user); // Call onLogin with status and token
      } catch (error) {
        setError(error.response.data.message || 'An error occurred.');
        setIsLoading(false);
      }
    }
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setPassword("");
    setError(null);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Login</Button>
      <Modal
        open={isModalOpen}
        closeIcon={Close}
        onClose={handleCloseModal}
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Modal>
    </>
  );
}

export default LoginForm;
