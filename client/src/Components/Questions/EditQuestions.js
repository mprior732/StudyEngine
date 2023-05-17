import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../UIElements/Input";
import { path } from "../../Utility/hostConfig";
import "./Questions.css";



const EditQuestion = ({q}) => {
    //console.log(q)
    const [question, setQuestion] = useState(q.question)
    const [answer, setAnswer] = useState(q.answer)

    let navigate = useNavigate();

    const updateQuestion = async(e) => {
        e.preventDefault();
        try {
            const body = { question, answer };
            const response = await axios.put(`${path.server}/questions/${q.questionid}`, body);

            //console.log(response.data)
            
            navigate("/courses/:course/:courseid")
            alert("Refresh Question List to see changes")

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleCancel = () => {
        setQuestion(q.question);
        setAnswer(q.answer);
    }

    return(
        <Fragment>

            <button type="button" className="btn edt-btn" onClick={() => handleCancel()} data-toggle="modal" data-target={`#id${q.questionid}`}>
            Edit
            </button>

            <div className="modal" id={`id${q.questionid}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Question</h4>
                    <button type="button" className="close" data-dismiss="modal" onClick={() => handleCancel()}>&times;</button>
                </div>

                <div className="modal-body">
                    <label>Question:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                    />
                    <label className="mt-2">Answer:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>

                <div className="modal-footer modal-btns">
                    <button 
                        type="button" 
                        className="btn sub-btn mr-3" 
                        data-dismiss="modal" 
                        onClick={(e) => updateQuestion(e)}
                        >Submit</button>
                    <button type="button" className="btn del-btn ml-3" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default EditQuestion;