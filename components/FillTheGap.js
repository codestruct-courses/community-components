import React, { useState } from "react"
import { InformationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const FillTheGap = ({ caption, children }) => {
    const [isCorrect, setIsCorrect] = useState(null)

    const gaps = React.Children.map(children?.props?.children, (child, index) => {
        if (child.type === "span") {
            let gapLength = child.props.answer.length || undefined
            return <input type="text" size={gapLength} className="border border-gray-200 rounded-lg bg-white text-sm" key={index} />
        } else {
            return child
        }
    })

    const checkAnswers = (e) => {
        let correctAnswers = React.Children.toArray(children.props.children).filter(child => child.type === "span").map(child => child.props.answer)
        let userInputs = e.target.closest(".fill-the-gap").querySelectorAll("input")
        let userAnswers = Array.from(userInputs).map(input => input.value)

        if (correctAnswers.length === userAnswers.length) {
            setIsCorrect(correctAnswers.every((answer, index) => answer === userAnswers[index]))
        } else {
            setIsCorrect(false)
        }
    }

    const reset = (e) => {
        setIsCorrect(null)
        e.target.closest(".fill-the-gap").querySelectorAll("input").forEach(input => input.value = "")
    }

    return (
        <div className="fill-the-gap border-2 border-gray-200 rounded-lg bg-white">
            <div className="flex items-center bg-gray-100 p-4 py-2 rounded-tr rounded-tl">
                <div className="grow">
                    <div className="text-lg font-bold my-3">{caption || "Fill in the gaps"}</div>
                </div>
                <div className="text-right">
                    <div onClick={(e) => reset(e)} className="cursor-pointer hover:rotate-45 transition-all">
                        <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="p-4 mt-4 pr-10">
                {gaps}
            </div>
            <div className="border-t-2 border-gray-200 mt-4">
                <div className="block md:flex items-center p-4">
                    <div className="grow">
                        <small className="text-gray-400 flex md:items-center">
                            <InformationCircleIcon className="inline-block w-4 h-4 mr-1" />
                            Fill in the gap(s) and check your answers to test your knowledge.
                        </small>
                    </div>
                    <div className="text-center md:text-right mt-6 md:mt-0">
                        {isCorrect === null && (
                            <div onClick={(e) => checkAnswers(e)} className="btn-default py-3 px-8">
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

export default FillTheGap