import { Card, TextField } from "@mui/material";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div style={{display: "flex", justifyContent:'center', minHeight:'80vh',flexDirection:'column'}}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
         
        }}
      >
        <Card
          variant="outlined"
          style={{ width: 400, padding: 20, marginTop: 30, minHeight: "100%" }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            style={{ marginBottom: 10 }}
            fullwidth={true}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextField
            id="outlined-basic"
            label="imageUrl"
            variant="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            style={{ marginBottom: 10 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AddCourse;
