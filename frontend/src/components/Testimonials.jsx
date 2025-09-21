import React from 'react'
import { testimonials } from '../utils/data'

const Testimonials = () => {
  return (
    <div className='mt-10  p-2 '>
       <div className='text-4xl text-center mb-3 font-semibold text-mine-shaft-100'>What
            <span className='text-cyan-/-aqua-500'> Users </span>says about us?
        </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {
            testimonials.map((test,index)=>
            <div key={index} className='flex flex-col border-cyan-/-aqua-500 p-3 border rounded-xl mt-4 hover:shadow-[0_0_5px_1px_cyan] shadow-cyan-500 hover:cursor-pointer'>
                <div className='flex gap-2 items-center'>
                <img src={`/Avatars/${test.avatar}`} alt="it's me" className='h-14 w-14 rounded-full object-cover' />
                <div>
                    <div className='text-lg text-mine-shaft-100 font-semibold '>{test.name}
                       <div className='flex '>
                       {test.rating} 
                       </div>
                    </div>
                </div>
                <div className='text-xs text-mine-shaft-300 '>
                {test.desc}
                </div>
                </div>
            </div>
            )
        }
       </div>
    </div>
  )
}

export default Testimonials
