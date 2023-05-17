import React, { Fragment, useState } from "react";


const AddCourse = () => {

    const [course, setCourse] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {course};
            const response = await fetch("http://localhost:5000/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5" onSubmit={onSubmitForm}>Add a Course</h1>
            <form className="d-flex mt-3">
                <input type="text" className="form-control" value={course} onChange={e => setCourse(e.target.value)}></input>
                <button className="btn btn-success ml-2">Add</button>
            </form>
        </Fragment> 
    );
}


export default AddCourse;