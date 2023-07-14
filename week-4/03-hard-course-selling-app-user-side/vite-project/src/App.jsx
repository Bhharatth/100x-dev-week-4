import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Courses from './components/Courses';
import AppBar from './components/AppBar';
import AddCourse from './components/AddCourse';
import SingleCourse from './components/SingleCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <AppBar/>
        <Routes>
          <Route path={'/addcourse'} element={<AddCourse/>}/>
          <Route path={'/course/:courseId'} element={<SingleCourse/>}/>
          <Route path={'/courses'} element={<Courses/>}/>
          <Route path={'/signin'} element={<Login/>}/>
          <Route path={'/signup'} element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
