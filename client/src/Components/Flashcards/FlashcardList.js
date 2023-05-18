import React from "react";
import Flashcard from "./Flashcard";

const FlashcardList = ({ flashcards }) => {

    return(
        <div className="card-grid mt-3 mb-3">
            {flashcards.map((flashcard) => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} />
            })}
        </div>
    )
}

export default FlashcardList;