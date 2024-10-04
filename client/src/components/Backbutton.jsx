import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Backbutton = () => {
    const navigate = useNavigate()

  return (
    <div className='flex gap-9 my-5 px-5 '>
    <FaArrowLeft onClick={()=> navigate(-1)}  className='hover:scale-150 cursor-pointer text-2xl' />
    <FaArrowRight onClick={()=> navigate(1)} className='hover:scale-150 cursor-pointer text-2xl' />
    </div>
  )
}

export default Backbutton