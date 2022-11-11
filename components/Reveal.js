import React, { useState } from "react"
import { CheckIcon, ClipboardIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'

const Reveal = ({ caption, children }) => {
    const [clicked, setClicked] = useState(false)

    const reveal = () => {
        setClicked(true)
    }

    return (
        <div onClick={reveal} className={`border-2 border-gray-200 rounded-lg bg-white mb-8 relative my-8 ${clicked ? "": "cursor-pointer"} group`}>
            {!clicked && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg flex z-10 group-hover:scale-105 transition-all">
                    <CursorArrowRaysIcon className="h-6 w-6 text-gray-700 mr-2" />
                    <span>{ caption || "Click to reveal"}</span>
                </div>
            )}
            <div className={`p-4 py-6 pr-10 ${clicked ? "" : "blur-md"} transition-all`}>
                {children}
            </div>
        </div>
    )
}

export default Reveal