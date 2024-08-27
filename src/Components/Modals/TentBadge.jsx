import React from 'react'
import { IoMdRemoveCircleOutline } from "react-icons/io";

const TentBadge = ({ item, handleFunction }) => {
  return (
    <div className="bg-purple-100 flex items-center rounded-md p-1 m-1">
        
        <h1>{item.product}</h1>
        <IoMdRemoveCircleOutline onClick={handleFunction} className="text-gray-400 text-xl ml-2 hover:text-black cursor-pointer transition duration-300" />

    </div>
  )
}

export default TentBadge