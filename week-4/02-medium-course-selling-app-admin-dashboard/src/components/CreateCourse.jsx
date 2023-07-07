import React from "react";
import { api, useTokenStorage } from "./utils";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [token, setToken] = useTokenStorage("adminToken", "fallbackToken");

  const handelCreateCourse = async () => {
    const newCourse = {
      title,
      desc,
      price,
    };
    const headers = {
        authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log(token);
    try {
      const res = await api.post("/admin/courses", newCourse, { headers });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Course Page</h1>
      <input
        type={"text"}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <input
        type={"text"}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <br />
      <input
        type={"text"}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button onClick={handelCreateCourse}>Create Course</button>
    </div>
  );
}
export default CreateCourse;
