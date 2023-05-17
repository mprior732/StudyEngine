import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../UIElements/Input";
import { curCourse } from "../../Utility/Course";
import { path } from "../../Utility/hostConfig";
import "./Courses.css";



const EditCourse = () => {

    const [course, setCourse] = useState(curCourse.course)

    let navigate = useNavigate();

    const updateCourse = async(e) => {
        e.preventDefault();
        let courseid = curCourse.id;
        try {
            const body = { course };
            const response = await axios.put(`${path.server}/courses/${courseid}`, body);

            console.log(response.data)
            curCourse.course = course;
            navigate("/courses/:course/:courseid")

        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <Fragment>

            <button type="button" className="btn edt-btn-nav mr-5" data-toggle="modal" data-target="#myModal">
            Edit Course
            </button>

            <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">{curCourse.course}</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                    <Input 
                        name={'Change Course Name'}
                        type={'text'}
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>

                <div className="modal-footer modal-btns">
                    <button 
                        type="button" 
                        className="btn sub-btn mr-3" 
                        data-dismiss="modal" 
                        onClick={(e) => updateCourse(e)}
                        >Submit</button>
                    <button type="button" className="btn del-btn ml-3" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default EditCourse;