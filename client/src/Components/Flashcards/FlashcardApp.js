import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { path } from "../../Utility/hostConfig";
import { curUsr } from "../../Utility/User";
import { curCourse } from "../../Utility/Course";


import FlashcardList from "./FlashcardList";
import "./FlashApp.css";


const FlashcardApp = () => {
    const [flashcards, setFlashcards] = useState([]);

    let navigate = useNavigate();

    //function to shuffle the flashcards around after each refresh
    function shuffle(array) {
        let currIndex = array.length,
        randInd;
        while (currIndex !== 0) {
        randInd = Math.floor(Math.random() * currIndex);
        currIndex--;

        [array[currIndex], array[randInd]] = [array[randInd], array[currIndex]];
        }
        return array;
    }


    const getQuestions = async () => {
        try {
            let courseid = curCourse.id;
            let username = curUsr.username;

            await axios.post(`${path.server}/questions/${username}/${courseid}`).then(
                (response) => {
                    //console.log(response.data)
                    const questionData = response.data;

                    //To display at most 12 questions
                    if(questionData.length <= 12){
                        shuffle(questionData);
                        setFlashcards(questionData);
                    } else{
                        shuffle(questionData);
                        let firstNQuestions = questionData.slice(0, 12);
                        setFlashcards(firstNQuestions);
                    }
                    
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
        navigate("/courses/:course/:courseid")
    }

    const handleShuffle = () => {
        getQuestions();
    }

    return(
        <Fragment>
            
            <div className="flashApp-container">

                <div className='title-container'>
                    <button className="back btn ml-2" onClick={handleBack}>Back</button>
                    <h1 className=" course text-center mb-3 mt-5">{curCourse.course} </h1>
                    <button className="button btn mb-3 mt-2" onClick={handleShuffle}>Shuffle</button>
                </div>

                <FlashcardList flashcards={flashcards} />
            </div>
        </Fragment>
    )
}

export default FlashcardApp;