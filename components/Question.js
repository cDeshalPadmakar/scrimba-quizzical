import React from "react"
import { nanoid } from 'nanoid'
import {decode} from "html-entities"

export default function Question(props) {
    const optionElements = props.data.options.map(item => {
        // 2
        const optionClasses = ["option-btn"]
        if(!props.isShowAnswer) {
            item.isSelected && optionClasses.push("option-selected")
        }
        else {
            item.isCorrect ? 
                optionClasses.push("correct-option") :
                item.isSelected && optionClasses.push("wrong-option")
        }
        
        // 1
        function handleClick() {
            if(!props.isShowAnswer) {
                return props.handleOptionClick(props.data.questionId, item.optionId)
            }
        }
        
        return (
            <button 
                key={nanoid(5)} 
                onClick={handleClick}
                className={optionClasses.join(" ")}
            >
                <p className="option">{decode(item.option)}</p>
            </button>
        )
    })
    
    return (
        <div className="question-container">
            <h2 className="question">{decode(props.data.question)}</h2>
            <div className="options-container">
                {optionElements}
            </div>
        </div>
    )
}

// 1
// reason: not let user click on options after answer is shown
// previously, line 29 
// onClick={ () => props.handleOptionClick(props.data.questionId, item.optionId) }

// 2
// adding class names based on condition
// cannot do optionClasses = ""
// if(some condition) {
//     optionClasses = "someclasss"
// }
// react throws error
// one sol: make optionClasses an array
// push class names based on condition
// react ele, className={array.join(" ")}
// refer article -> https://timmousk.com/blog/react-conditional-classname/