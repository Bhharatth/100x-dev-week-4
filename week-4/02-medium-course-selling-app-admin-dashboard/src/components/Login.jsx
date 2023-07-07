import React, { useEffect } from "react";
import { api, useTokenStorage } from "./utils";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = useTokenStorage("adminToken", "fallbackToken");

  const handleLogin = async () => {
    try {
      const response = await api.post("/admin/login", null, {
        headers: {
          username: email,
          password: password,
        },
      });
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    console.log(token);
  }, [token])

  return (
    <div>
      <h1>Login to admin dashboard</h1>
      <br />
      Email -{" "}
      <input
        type={"text"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <br />
      <input
        type={"text"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleLogin}>Login</button>
      <br />
      New here? <a href="/register">Register</a>
    </div>
  );
}

export default Login;
