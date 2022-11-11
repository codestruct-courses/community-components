import React, { useState } from "react"
import { ArrowPathIcon, CheckBadgeIcon, InformationCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

const DragDropContext = dynamic(() => import('react-beautiful-dnd').then(mod => { return mod.DragDropContext; }), { ssr: false })
const Droppable = dynamic(() => import('react-beautiful-dnd').then(mod => { return mod.Droppable; }), { ssr: false })
const Draggable = dynamic(() => import('react-beautiful-dnd').then(mod => { return mod.Draggable; }), { ssr: false })

const TrueFalseDrag = ({ caption, correctLabel, incorrectLabel, children }) => {
    const [items, setItems] = useState(
        children.map((child, index) => {
            return {
                id: index.toString(),
                content: child,
                correct: child.props.correct
            }
        })
    )
    const [userDroppedInCorrect, setUserDroppedInCorrect] = useState([])
    const [userDroppedInFalse, setUserDroppedInFalse] = useState([])


    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }

        // get actual item from result
        const item = items.find(item => item.id == result.draggableId)
        if (result.destination.droppableId == "correct") {
            if (item?.correct == "true") {
                setUserDroppedInCorrect([...userDroppedInCorrect, item])
                const newItems = items.filter(item => item.id !== result.draggableId)
                setItems(newItems)
            }
        } else {
            if (item?.correct == "false") {
                setUserDroppedInFalse([...userDroppedInFalse, item])
                const newItems = items.filter(item => item.id !== result.draggableId)
                setItems(newItems)
            }
        }
    }

    const reset = () => {
        setItems(
            children.map((child, index) => {
                return {
                    id: index.toString(),
                    content: child,
                    correct: child.props.correct
                }
            })
        )
        setUserDroppedInCorrect([])
        setUserDroppedInFalse([])
    }

    const getCorrectListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#dce9fe" : "lightgreen",
    })
    
    const getFalseListStyle = isDraggingOver => ({
        background: isDraggingOver ? "#dce9fe" : "#fba5a5",
      })

    return (
        <div className="border-2 border-gray-200 rounded-lg bg-white mb-8 relative my-8">
            <div className="flex items-center bg-gray-100 p-4 py-2 rounded-tr rounded-tl">
                <div className="grow">
                    <div className="text-lg font-bold my-3">{caption || "Drag the cards into the correct buckets"}</div>
                </div>
                <div className="text-right">
                    <div onClick={(e) => reset(e)} className="cursor-pointer hover:rotate-45 transition-all">
                        <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="initial">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 my-8 grid grid-cols-12 gap-6">
                            {items.length == 0 && (
                                <div className="col-span-12 text-center">
                                    <i className="text-gray-400">You're all done! 🎉</i>
                                </div>
                            )}
                            {items?.map((child, index) => (
                                <Draggable key={index} draggableId={child.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                            className="pr-10 border-2 border-gray-200 p-4 rounded-md bg-white z-10 relative col-span-6 text-center text-lg"
                                        >
                                            {child.content}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>

                <div className="grid grid-cols-2 gap-4 px-4 py-8 border-t-2 border-gray-200 bg-gray-100">
                    <div className="col-span-1 relative">
                        {userDroppedInCorrect.length == 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg flex z-10">
                                <span>{correctLabel || "Correct"}</span>
                            </div>
                        )}
                        <Droppable droppableId="correct">
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={`p-4 rounded-md h-full min-h-[160px] bg-green-300`} style={getCorrectListStyle(snapshot.isDraggingOver)}>
                                    {userDroppedInCorrect.map((child, index) => (
                                        <Draggable key={index} draggableId={child.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className={`mt-4 pr-10  border-2 border-gray-200 p-4 rounded-md bg-white z-10 relative text-center text-lg`}
                                                >
                                                    <div className="flex items-center text-center">
                                                        <CheckBadgeIcon className="h-6 w-6 text-green-500 mr-2 min-w-min" />
                                                        <span>{child.content}</span>
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="col-span-1 relative">
                        {userDroppedInFalse.length == 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg flex z-10">
                                <span>{incorrectLabel || "Incorrect"}</span>
                            </div>
                        )}
                        <Droppable droppableId="incorrect">
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 bg-red-300 rounded-md h-full min-h-[160px]" style={getFalseListStyle(snapshot.isDraggingOver)}>
                                    {userDroppedInFalse.map((child, index) => (
                                        <Draggable key={index} draggableId={child.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="mt-4 pr-10  border-2 border-gray-200 p-4 rounded-md bg-white z-10 relative text-center text-lg"
                                                >
                                                    <div className="flex items-center text-center">
                                                        <NoSymbolIcon className="h-6 w-6 text-red-500 mr-2 min-w-min" />
                                                        <span>{child.content}</span>
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}

export default TrueFalseDrag