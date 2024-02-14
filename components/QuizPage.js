import React from "react"
import Question from "./Question"
import ShowScore from "./ShowScore"
import { nanoid } from "nanoid"

export default function Quiz() {
    
    const [quizQuestions, setQuizQuestions] = React.useState([]) // contais all quiz question data
    const [isShowAnswer, setIsShowAnswer] = React.useState(false)
    const [fetchNewData, setFetchNewData] = React.useState(false)
    const [isShowLoadingLogo, setIsShowLoadingLogo] = React.useState(false)
    
    // fetching data from OTDB API
    React.useEffect( () => {
        setIsShowLoadingLogo(true)
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                const questions = getQuestionsFromData(data) // 1
                ransomiseOptionsArrayInQuestions(questions) // 2
                setQuizQuestions(questions)
                setIsShowLoadingLogo(false)
            })
    }, [fetchNewData])
    
    // 1
    function getQuestionsFromData(data) {
        return data.results.map(que => {
            const options = que.incorrect_answers.map(option => ({
                option: option,
                isCorrect: false,
                isSelected: false,
                optionId: nanoid()
            }))
            options.push( 
                {option: que.correct_answer, 
                isCorrect: true, 
                isSelected: false,
                optionId: nanoid()} 
            )
            return {
                questionId: nanoid(),
                question: que.question,
                options: options
            }
        })
    }
    
    // 2
    function ransomiseOptionsArrayInQuestions(questions) {
        questions.forEach(question => {
            let currentIndex = question.options.length
            let randomIndex
            while (currentIndex > 0) {
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                const temp = question.options[currentIndex]
                question.options[currentIndex] = question.options[randomIndex]
                question.options[randomIndex] = temp
            }
        })
    }
    
    function handleOptionClick(questionId, optionId) {
        setQuizQuestions(prevQuizQuestions => {
            return prevQuizQuestions.map(prevQuizQue => {
                if(prevQuizQue.questionId !== questionId) {
                    return prevQuizQue
                }
                else {
                    const options = prevQuizQue.options.map(prevOption => {
                        return prevOption.optionId !== optionId ?
                            {...prevOption, isSelected: false} :
                            {...prevOption, isSelected: !prevOption.isSelected}
                    })
                    return {...prevQuizQue, options: options}
                }
            }      
            )
        })   
    }
    
    function handleAnswerClick() {
        if(!isShowAnswer) {
            setIsShowAnswer(true)
        }
        else {
            setIsShowAnswer(false)
            setFetchNewData(prev => !prev)
        }
    }
    
    const questionsJSX = quizQuestions.map(que => (
        <Question key={nanoid(5)} data={que} isShowAnswer={isShowAnswer} handleOptionClick={handleOptionClick}/>
    ))
    
    return (
        <div className="quiz-page">
            {questionsJSX}
            <div className="quiz-result">
                {isShowAnswer && <ShowScore data={quizQuestions} />}
                <button className="quiz-result-btn" onClick={handleAnswerClick}>
                    {isShowAnswer ? "Play again" : "Show answers"}
                    {isShowLoadingLogo && <div className="spinner"></div>}
                </button>
            </div>
        </div>
    )
}