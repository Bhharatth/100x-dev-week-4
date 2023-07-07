import React, { useEffect, useState } from "react";
import { api } from "../hooks";

const PurchasedCourses = () => {
  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchCourse = async () => {
      const res = await api.get("/users/purchasedCourses", { headers });
      setPurchasedCourses(res.data.courses);
    };
    fetchCourse();
  });
  return (
    <div>
      <h1>PurchasedCourses</h1>
      <br />
      {purchasedCourses &&
        purchasedCourses.map((c) => {
          <Course title={props.title} desc={props.desc} price={props.price} />;
        })}
    </div>
  );
};

function Course(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <br />
      <h2>{props.desc}</h2>
      <br />
      <h2>{props.price}</h2>
    </div>
  );
}

export default PurchasedCourses;
