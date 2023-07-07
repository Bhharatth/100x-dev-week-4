import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

async function useDeleteTodo(id){
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    console.log('todo successfully deleted');
    
  } catch (error) {
    console.log(error)
  }
}

async function useUpdateTodo(updatedTodo,id) {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      console.log("todos updated");
    } catch (error) {
      console.log(error);
    }
};



function useCreateTodo() {
  const createTodo = async (newTodo) => {
    try {
      await axios.post("http://localhost:3000/todos", newTodo);
      console.log("todo created");
      console.log(newTodo);
    } catch (error) {
      console.log(error);
    }
  };
  return createTodo;
}

function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTodos(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    setInterval(fetchData, 3000);
    // fetchData();
  }, []);
  return todos;
}

function App() {
  const createTodo = useCreateTodo();
  // fetch all todos from server
  const todos = useTodos();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  const handleCreateTodo = async () => {
    const newTodo = {
      title: title,
      description: description,
    };
    await createTodo(newTodo);
  };
  


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Easy Todo App</h1>
          <input
            type="text"
            placeholder="title"
            style={{ marginTop: "10px", paddingTop: "5px", width: "300px" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            style={{ marginTop: "10px", paddingTop: "5px", width: "300px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            style={{ marginTop: "10px", paddingTop: "5px", width: "200px" }}
            onClick={handleCreateTodo}
          >
            Create
          </button>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {todos.map((todo) => {
              return <Todo title={todo.title} description={todo.description} id={todo.id}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function Todo(props) {

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updateddesc, setUpdatedDesc] = useState("");

  const handleUpdate=async (id)=>{
    const updated ={
      title: updatedTitle,
      description:updateddesc,
    };
    await useUpdateTodo(updated,id);
    console.log('updated success');

    setUpdatedDesc("");
    setUpdatedTitle("");
  };

  const handleDelete= async(id)=> {
    try {
      await useDeleteTodo(id);
      console.log('todo deleted successfully')
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const todoBodyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    margin: "10px",
    width: "300px",
  };

  const inputFieldStyle = {
    width: "200px",
    height: "30px",
    marginBottom: "10px",
  };

  const updateButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "5px 10px",
    marginRight: "10px",
    cursor: "pointer",
    width: "100px",
  };

  const deleteButtonStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    cursor: "pointer",
    width: "100px",
  };

  const editTodo = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={todoBodyStyle}>
      <div>
        <h2>Title: {props.title}</h2>
        <h3>Desc: {props.description}</h3>
      </div>
      <div style={editTodo}>
        <input type="text" placeholder="Title" style={inputFieldStyle} onChange={(e)=>setUpdatedTitle(e.target.value)}/>
        <input
          type="text"
          placeholder="Description"
          style={inputFieldStyle}
          onChange={(e) => setUpdatedDesc(e.target.value)}
        />
        <button style={updateButtonStyle} onClick={()=> handleUpdate(props.id)}>Update</button>
        <button style={deleteButtonStyle}onClick={()=> handleDelete(props.id)}>Delete</button>
      </div>
    </div>
  );
}
export default App;
