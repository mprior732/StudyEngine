import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

//components
import Login from "./Components/Login/Login"
import CreateAcc from "./Components/CreateAccount/CreateAccount";
import CoursesComponent from "./Components/Courses/Courses";
import QuestionsComponent from "./Components/Questions/AddQuestions";



function App() {
  return (
    <BrowserRouter>
        <Fragment>

          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/createAcc" Component={CreateAcc}/>
            <Route path="/courses" Component={CoursesComponent} />
            <Route path="/courses/:course/:courseid" Component={QuestionsComponent} />
          </Routes>

        </Fragment>
    </BrowserRouter>
  );
}

export default App;
