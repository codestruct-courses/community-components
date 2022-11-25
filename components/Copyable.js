import React, { useState } from "react"
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'

const Copyable = ({ children }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(children?.props?.children)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    return (
        <div className="border-2 border-gray-200 rounded-lg bg-white mb-8 relative">
            <div onClick={copyToClipboard} className="cursor-pointer bg-gray-100 hover:bg-gray-300 transition-colors rounded p-2 absolute top-2 right-2">
                {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                    <ClipboardIcon className="h-5 w-5 text-gray-700" />
                )}
            </div>
            <div className="p-4 pr-10">
                {children}
            </div>
        </div>
    )
}

export default Copyable