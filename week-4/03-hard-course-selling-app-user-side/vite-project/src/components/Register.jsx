import React from "react";
import { useState } from "react";
import { api, useTokenStorage } from "../hooks";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/signup",  {username, password});
      setToken(res.data.token);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <br />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.password)}
      />
      <br />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default Register;
