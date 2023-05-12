import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

//components
import Login from "./Components/Login/Login"
import CreateAcc from "./Components/CreateAccount/CreateAccount";
import AddCourse from "./Components/Courses/AddCourses";





function App() {
  return (
    <BrowserRouter>
        <Fragment>

          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/createAcc" Component={CreateAcc}/>
          </Routes>

        </Fragment>
    </BrowserRouter>
  );
}

export default App;
