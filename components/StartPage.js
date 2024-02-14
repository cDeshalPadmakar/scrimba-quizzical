import React from "react"

export default function StartPage(props) {
    return(
        <div className="start-page-container">
            <h1>Quizzical</h1>
            <p className="start-page-description">Some description if needed</p>
            <button className="start-quiz-btn" onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}