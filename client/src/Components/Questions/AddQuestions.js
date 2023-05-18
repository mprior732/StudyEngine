import React, { Fragment, useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../UIElements/Input";
import { path } from "../../Utility/hostConfig";
import { curUsr } from "../../Utility/User";
import { curCourse } from "../../Utility/Course";
import "./Questions.css"; 

//components
import EditCourse from "../Courses/EditCourses";
import EditQuestion from "./EditQuestions";



const QuestionsComponent = () => {

    const [question, setNewQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);

    let userid = curUsr.id;
    let username = curUsr.username;

    let navigate = useNavigate();

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            let courseid = curCourse.id;

            const body = { courseid, username, question, answer };
            const response = await axios.post(path.server + "/questions", body);

            //console.log(response.data);
            if(!Object.keys(response.data)){
                console.log("failed");
            }else{
                console.log("success");
                alert("Question added successfully!");
                getQuestions();
            }
        } catch (error) {
            console.error(error.message);
        };
    };

    //delete
    const selectQuestion = async (questionid) => {
        try {

            const questionInfo = await axios.get(`${path.server}/questions/${questionid}`)

            console.log(questionInfo.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteQuestion = async (questionid) => {
        try {
            
            if(window.confirm("Are you sure you want to delete this question?")){
                const delQuest = await axios.delete(`${path.server}/questions/${questionid}`);
                setQuestions(questions.filter(q => q.questionid !== questionid));
            }else{
                console.log("delete canceled")
            }

            
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteCourse = async (courseid) => {
        try {
            
            if(window.confirm("Deleting the course will also remove all questions.\nAre you sure you want to delete this course?")){
                const delCourse = await axios.delete(`${path.server}/courses/${courseid}`);
                curCourse.id = "";
                curCourse.course = "";
                navigate("/courses");
            }else{
                console.log("delete canceled");
            }

            
        } catch (error) {
            console.log(error.message)
        }
    }



    const getQuestions = async () => {
        try {
            let courseid = curCourse.id;
            // console.log(courseid);
            // console.log(username);
            await axios.post(`${path.server}/questions/${username}/${courseid}`).then(
                (response) => {
                    //console.log(response.data)
                    const questionData = response.data;
                    setQuestions(questionData);
                }
            )
 
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getQuestions(); 
    }, [])

    const handleBack = () => {
        curCourse.id = "";
        curCourse.course = "";
        navigate("/courses");
    }

    const handleRefresh = () => {
        getQuestions();
    }

    const handleStudy = () => {
        navigate("/courses/flashapp");
    }



    return(
        <Fragment>

                <div className="addCourse-container">
                
                    <div className='title-container'>
                        <button className="back btn ml-2" onClick={handleBack}>Back</button>
                        <h1 className="course text-center mr-3 mb-3 mt-5">{curCourse.course} </h1>
                    </div>
                    <div className='btn-container'>
                        <div className="btn-nav-container">
                            <EditCourse />
                            <button className="button-nav btn mb-2 mt-2" onClick={handleStudy}>Study</button>
                            <button className="del-btn-nav btn ml-5" onClick={() => {
                                deleteCourse(curCourse.id)
                            }}>Delete Course</button>
                        </div>
                    </div>
                    <div className='title-container'>
                        <h2 className="text-center mt-3">Add Question</h2>
                    </div>
            
                    <form onSubmit={handleAddQuestion}>
                        <div className="text-area">
                            <Input 
                                name={'Question'}
                                type={'text'}
                                value={question}
                                onChange={(e) => setNewQuestion(e.target.value)}
                            />
                        </div>
                        <div className="text-area">
                            <Input 
                                name={'Answer'}
                                type={'text'}
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                        <div className="btn-container mb-2">
                            <button className="button btn">Submit</button>

                        </div>
                    </form>

                    <div className='title-container'>
                    <h2 className="text-center mb-2">Question List</h2>
                    <button className="button btn mb-1" onClick={handleRefresh}>Refresh</button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map(q => (
                            <tr key={q.questionid}>
                                <td className="q-content">
                                    {q.question}
                                </td>
                                <td className="q-content">
                                    {q.answer}
                                </td>
                                <td>
                                    <EditQuestion q = {q} />
                                </td>
                                <td>
                                <button className="del-btn btn" onClick={() => {
                                    deleteQuestion(q.questionid)
                                }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>


        </Fragment>
    );
};

export default QuestionsComponent;