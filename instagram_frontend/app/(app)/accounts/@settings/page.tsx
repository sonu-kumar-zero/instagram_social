import React from 'react'
import { FiSettings } from 'react-icons/fi'

const page = () => {
  return (
    <div className='w-full h-[100dvh] flex justify-center items-center'>
      <div className="flex flex-col items-center gap-3">
        <FiSettings size={40} />
        <div className="text-[#575757] text-xl">
          Choose Option
        </div>
      </div>
    </div>
  )
}

export default page
