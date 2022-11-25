import React, { useState } from "react"
import { ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

const MultipleChoiceQuiz = ({ question, children }) => {
    const [answers, setAnswers] = useState([])
    const [isCorrect, setIsCorrect] = useState(null)
    const correctAnswers = React.Children.toArray(children).filter(child => child.props?.correct == "true")

    const handleAnswer = (answer) => {
        if (answers?.includes(answer)) {
            setAnswers(answers.filter((a) => a !== answer))
        } else {
            setAnswers([...answers, answer])
        }
    }

    const checkAnswers = () => {
        if (answers.length === correctAnswers.length) {
            setIsCorrect(answers.every((answer) => answer.props.correct == "true"))
        } else {
            setIsCorrect(false)
        }
    }

    const reset = () => {
        setAnswers([])
        setIsCorrect(null)
    }

    return (
        <div className="border-2 border-gray-200 rounded-lg bg-white mb-8">
            <div className="flex items-center bg-gray-100 p-4 py-2 rounded-tr rounded-tl">
                <div className="grow">
                    <div className="text-lg font-bold my-3">{question || "Choose the correct answers"}</div>
                </div>
                <div className="text-right">
                    <div onClick={reset} className="cursor-pointer hover:rotate-45 transition-all">
                        <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                {children?.filter(child => child.props?.correct).map((child, index) => {
                    return (
                        <div onClick={() => handleAnswer(child)} key={index} className="grid grid-cols-12 gap-4 border-2 border-gray-200 p-4 rounded bg-white cursor-pointer my-4">
                            <div className="col-span-1">
                                <input checked={answers?.includes(child)} type="checkbox" name="answer" id={`answer-${index}`} value={index} onChange={(e) => setAnswers(e.target.value)} />
                            </div>
                            <div className="col-span-11" onClick={() => setAnswers(index)} data-correct={child.props?.correct}>
                                {child}
                            </div>
                        </div>
                    )
                })}
                <div className="block md:flex mt-8 mb-4 items-center">
                    <div className="grow">
                        <small className="text-gray-400 flex md:items-center">
                            <InformationCircleIcon className="inline-block w-4 h-4 mr-1" />
                            Select one or more questions and check your answers to test your knowledge.
                        </small>
                    </div>
                    <div className="text-center md:text-right mt-6 md:mt-0">
                        {isCorrect === null && (
                            <div onClick={checkAnswers} className="btn-default py-3 px-8">
                                Check Answers
                            </div>
                        )}
                        {isCorrect === true && (
                            <div className="btn-default bg-green-400 py-3 px-8 animate-bounce pointer-events-none">
                                Correct 🎉
                            </div>
                        )}
                        {isCorrect === false && (
                            <div className="btn-default bg-red-400 py-3 px-8 animate-shake pointer-events-none">
                                Incorrect ❌
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultipleChoiceQuiz