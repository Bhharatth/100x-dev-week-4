import React from "react";
import { api, useTokenStorage } from "./utils";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = useTokenStorage('adminToken', 'fallbackToken')

  const handleRegister = async () => {
    try {
      const response = await api.post("/admin/signup",{
        username: email,
        password,
      },);
      console.log(response.data.token);
      const newToken = response.data.token;
      setToken(newToken);

    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);


  return (
    <div>
      <h1>Register to the website</h1>
      <br />
      <input type={"text"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type={"text"} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>signup</button>
      Already a user?{" "}
      <a href="/login" >
        Login
      </a>
    </div>
  );
}

export default Register;
