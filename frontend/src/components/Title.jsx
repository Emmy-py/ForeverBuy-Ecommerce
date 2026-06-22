import React from 'react'

function Title({text1, text2}) {
  return (
    <div className='flex gap-2 items-center justify-center text-[] mb-2 md:text-base'>
        <div className='text-gray-500 '>{text1}</div>
        <div className='text-gray-700 font-semibold '>{text2}</div>
        <div className='bg-gray-700 w-[50px] h-[1px] sm:h-[2px]'></div>
    </div>
  )
}

export default Title