import React, { useEffect, useState } from 'react'
import { api, useTokenStorage } from '../hooks';

const Courses = () => {
  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");
  const [courses, setCourses] = useState([]);

  useEffect(()=> {
    const fetchCourse=async()=> {

      const headers = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
      const res = await api.get("/user/courses",{headers});
      setCourses(res.data.courses);
    }
    fetchCourse();

  },[]);

  return (
    <div>
      <h1>Courses</h1>
      <br/>
      {courses && Course.map(c=> {
        <Course title={c.title} desc={c.desc} price={c.price}/>
      })}
    </div>
  )
}
function Course (props){
  return <div>
    <h1>{props.title}</h1>
    <br/>
      <h2>{props.desc}</h2>
      <h2>{props.price}</h2>
  </div>
}



export default Courses