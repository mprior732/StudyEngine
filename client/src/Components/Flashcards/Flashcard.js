import React, { useState, useRef, useEffect } from "react";

const Flashcard = ({ flashcard }) => {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState("initial");

    const front = useRef();
    const back = useRef();

    function setMaxHeight() {
        const frontHeight = front.current.getBoundingClientRect().height;
        const backHeight = back.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(() => {
        setMaxHeight();
    }, [flashcard.question, flashcard.answer]);
    
    // useEffect(() => {
    //     window.addEventListener("resize", setMaxHeight());
    //     return () => window.removeEventListener("resize", setMaxHeight());
    // }, []);

    
    return(
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height: height }}
            onClick={() => setFlip(!flip)}>
                <div className="card-front" ref={front}>
                    {flashcard.question}
                </div>
                <div className="card-back" ref={back}>
                    {flashcard.answer}
                </div>
        </div>
    )
}

export default Flashcard;