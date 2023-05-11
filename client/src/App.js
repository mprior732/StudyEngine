import React, { Fragment } from "react";
import './App.css';

//components
import AddCourse from "./Components/Courses/AddCourses";

function App() {
  return (
    <Fragment>
      <div>
        <AddCourse />
      </div>
    </Fragment>
  );
}

export default App;
