import React from "react"

export default function ShowScore(props) {
    let numOfQuestions = 0
    let numOfCorrectAnswers = 0
    props.data.forEach(quizQuestion => {
        numOfQuestions++
        quizQuestion.options.forEach(option => {
            if(option.isCorrect && option.isSelected) {
                numOfCorrectAnswers++
            }
        })
    })
    return (
        <p className="quiz-result-score">
            You scored {numOfCorrectAnswers}/{numOfQuestions} correct answers
        </p>
    )
}