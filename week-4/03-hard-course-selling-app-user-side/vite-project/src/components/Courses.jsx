import React, { useEffect, useState } from "react";
import { api, useTokenStorage } from "../hooks";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Courses = () => {

  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const headers = {
        authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      };
      const res = await api.get("/users/courses", { headers });
      setCourses(res.data.courses);
      console.log(res.data.courses);
    };
    fetchCourse();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <br />
      {courses &&
        courses.map((course) => {
         return <Course course={course} />;
        })}
    </div>
  );
};

export function Course({ course }) {
  const navigate = useNavigate();
  
  return (
    <Card style={{margin:10, width:300,
    minHeight:200,
    padding:20}}>
      <Typography align="center" variant="h5">{course.title}</Typography>
      <Typography textAlign="center" variant="subtitle1">{course.description}</Typography>
      <img src={course.imageUrl} style={{width:300}}></img>
      <div style={{display:"flex",justifyContent:"center", marginTop:"20"}}>
      <Button variant="contained" size="large" onClick={()=> {
        navigate("/course/" + course._id);
      }}>Edit</Button>
      </div>
    </Card>
  );
}

export default Courses;
