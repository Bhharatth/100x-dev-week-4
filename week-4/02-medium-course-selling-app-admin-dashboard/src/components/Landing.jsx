
import React from "react";
import { Link } from "react-router-dom";
import { useTokenStorage } from "./utils";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const [token, setToken, deleteToken] = useTokenStorage("adminToken", "fallbackToken");
    const handleLogout = async(e)=> {
        e.preventDefault();
        deleteToken();
    };

    return <div>
        <h1>Welcome to course selling website!</h1>
        <Link to="/register">Register</Link>
      <br/>
      <Link to="/login">Login</Link>
      {token && <button onClick={handleLogout}>Logout</button>}
    </div>
}

export default Landing;