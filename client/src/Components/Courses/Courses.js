import React, { Fragment, useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../UIElements/Input";
import { path } from "../../Utility/hostConfig";
import { curUsr } from "../../Utility/User";
import "./Courses.css";


//console.log(curUsr.username);
const CoursesComponent = () => {

    const [course, setNewCourse] = useState("");
    const [courses, setCourses] = useState([]);

    let userid = curUsr.id;
    let username = curUsr.username;

    let navigate = useNavigate();

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            //console.log(newCourse)
            const body = { userid, course };
            const response = await axios.post(path.server + "/courses", body);

            console.log(response.data);
            if(!Object.keys(response.data)){
                console.log("failed");
            }else{
                console.log("success");
                setNewCourse('')
                alert("Course added successfully. Please refresh course list to see changes");
                
            }
        } catch (error) {
            console.error(error.message);
        };
    };



    const getCourses = async () => {
        try {
            axios.post(path.server + "/courses/" + userid).then(
                (response) => {
                    //console.log(response.data)
                    const courseData = response.data;
                    setCourses(courseData);
                }
            )
 
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCourses(); 
    }, [])

    const handleLogout = () => {
        curUsr.id = "";
        curUsr.username = "";
        navigate("/");
    }

    const refreshList = () =>{
        getCourses();
    }


    return(
        <Fragment>

                <div className="addCourse-container">
                
                    <div className='title-container'>
                        <button className="logout btn ml-2" onClick={handleLogout}>Logout</button>
                        <h1 className="text-center">Welcome, {username} </h1>
                        <h2 className="text-center">Add a Course</h2>
                    </div>
            
                    <form onSubmit={handleAddCourse}>
                        <div className="text-area mb-4">
                            <Input 
                                name={'New Course'}
                                type={'text'}
                                value={course}
                                onChange={(e) => setNewCourse(e.target.value)}
                            />
                            <button className="button btn ml-2">Submit</button>
                        </div>
                        
                    </form>

                    <div className='title-container'>
                    <h1 className="text-center mb-3">Course List</h1>
                    <button className="button_refresh btn mb-2" onClick={refreshList}>Refresh List</button>
                </div>

                <table className="table">
                    <tbody>
                        {courses.map(c => (
                            <tr>
                                <td>
                                    <button className="button_tr btn">{c.course}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>


        </Fragment>
    );
};

export default CoursesComponent;