import React, { Fragment, useState } from "react";
import { Input } from "../UIElements/Input"
import { path } from "../../hostConfig"
import "./AddCourses.css"

const AddCourse = () => {

    const [newCourse, setNewCourse] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { newCourse };
            const response = await fetch(path + "/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (error) {
            console.error(error.message);
        };
    };

    return(
        <Fragment>

                <div className="login-container">

                    <div className='title-container'>
                        <h1 className="text-center">Add a Course</h1>
                    </div>
            
                    <form onSubmit={ onSubmitForm }>
                        <div className="text-area">
                            <Input 
                                name={'New Course'}
                                type={'text'}
                                value={newCourse}
                                onChange={(e) => setNewCourse(e.target.value)}
                            />
                            <button className="button btn ml-2">Submit</button>
                        </div>
                        
                    </form>
                </div>


        </Fragment>
    );
};

export default AddCourse;