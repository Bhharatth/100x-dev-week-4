import React from 'react'
import { useTokenStorage } from '../hooks';

const LandingPage = () => {
    const [token, setToken, deleteToken] = useTokenStorage("adminToken", "fallbackToken");

    const logout=()=>{
        e.preventDefault;
        deleteToken();
    }
  return (
    <div>
        <h1>Landing Page</h1>
        <br/>
        <h2></h2>
        <br/>
        <h2></h2>
        <br/>
        <button>Logout</button>
    </div>
  )
}

export default LandingPage