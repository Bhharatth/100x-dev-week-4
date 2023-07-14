import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, useTokenStorage } from "../hooks";
import { Button, Typography } from "@mui/material";

const SingleCourse = () => {
  const [token, setToken] = useTokenStorage("userToken", "fallbackToken");
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const res = await api.get("/admin/course/" + courseId, { headers });
      setCourse(res.data.courses);
      console.log(res.data.course);
    };
    fetchCourse();
  }, []);

  if (!course) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading...
      </div>
    );
  }


  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>

        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
};


function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}


function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.image);
  const [price, setPrice] = useState(course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varient={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            update Courese details
          </Typography>

          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: 10 }}
            value={title}
            onChange={() => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="desccription"
            variant="outlined"
            value={description}
            onChange={() => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="ImageUrl"
            variant="outlined"
            value={image}
            onChange={() => {
              setImage(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={price}
            onChange={() => {
              setPrice(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={async () => {
              api.put(
                "/admin/course" + course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                imageLink: imageLink,
                price,
              };
              setCourse(updatedCourse);
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {course.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default SingleCourse;
