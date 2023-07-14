import React, { useEffect, useState } from "react";
import { api, useTokenStorage } from "../hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", {
        username,
        password,
      });
      setToken(res.data.token);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <div>
      <h1>Login</h1>
      <br />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
