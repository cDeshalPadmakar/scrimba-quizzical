import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"


export default function App() {
    
    const [isStart, setIsStart] = React.useState(true)
    
    function handleClick() {
        setIsStart(prevIsStart => !prevIsStart)
    }
    
    return (
        <main>
            {isStart ? 
                <StartPage handleClick={handleClick} /> : 
                <QuizPage />
            }
        </main>    
    )
}