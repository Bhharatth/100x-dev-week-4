import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api, useTokenStorage } from "../hooks";

const AppBar = () => {
    const [token, setToken] = useTokenStorage("userToken", "fallbackToken");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const getEmail = async () => {
      const res = await api.post("/users/me", { headers });
      setEmail(res.data);
    };

    getEmail();
  }, []);

  return (
    <div style={{"display": "flex","justifyContent":"space-between"}}>
      <div>
        <Typography>Coursera</Typography>
      </div>

      <div>
        <Button variant="contained"
          onClick={() => {
            navigate("/addcourses");
          }}
        >
          Add courses
        </Button>
      </div>
      <div>
        <Button variant="contained"
          onClick={() => {
            navigate("/courses");
          }}
        >
           courses
        </Button>
      </div>

      <div>
        <Button variant="contained"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign In
        </Button>
      </div>

      <div>
        <Button variant="contained">Logout</Button>
      </div>
    </div>
  );
};

export default AppBar;
