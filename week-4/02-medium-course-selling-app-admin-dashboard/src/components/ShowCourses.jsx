import React, { useEffect } from "react";
import { api, useTokenStorage } from "./utils";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const [token, setToken] = useTokenStorage("adminToken", "fallbackToken");

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    useEffect(()=> {
        const fetchCourses =async()=> {
            const headers = {
                authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };
            const response = await api.get("/admin/courses",{headers});
            setCourses(response.data.courses);
            console.log(response.data.courses)
        }
        fetchCourses();
        // setInterval(fetchCourses, 1000);
    },[]);

    return <div>
        <h1>Create Course Page</h1>
        {courses && courses.map(c => <Course title={c.title} desc={c.desc} price={c.price}/>)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
        <br/>
        <h2>{props.desc}</h2>
        <h2>{props.price}</h2>
    </div>
}

export default ShowCourses;