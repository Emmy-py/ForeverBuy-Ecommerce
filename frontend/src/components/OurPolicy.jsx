import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col items-center sm:flex-row justify-around gap-8 py-10 text-center'>
        
        <div>
            <img src={assets.exchange_icon} alt="" className='w-10 md:w-12 mx-auto mb-5' />
            <h1 className='font-bold'>Easy Exchange Policy</h1>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt="" className='w-10 md:w-12 mx-auto mb-5' />
            <h1 className='font-bold'>7 Days Return Policy</h1>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>

        <div>
            <img src={assets.support_img} alt="" className='w-8 md:w-10 mx-auto mb-5' />
            <h1 className='font-bold'>Best Customer Support</h1>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>

    </div>
  )
}

export default OurPolicy