import React, { useState, useEffect } from "react"
import { CheckIcon, ClipboardIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

const Callout = ({ type, children }) => {
    console.log(type)
    const [color, setColor] = useState(
        type === "info" ? "blue" :
        type === "danger" ? "red" :
        type === "success" ? "green" :
        "blue"
    )


    return (
        <div className={`bg-${color}-100 text-black rounded-tr-lg rounded-br-lg p-8 my-8 relative border-l-4 border-${color}-700`}>
            <div className="absolute -left-4 -top-4 bg-[#fbfaf9] p-1 rounded-full">
                <InformationCircleIcon className={`h-8 w-8 text-${color}-600 fill-white`} />
            </div>
            {children}
        </div>
    )
}

export default Callout