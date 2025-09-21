import React from 'react'
import { companies } from '../utils/data'
const Companies = () => {
  return (
    <div className='pb-2'>
      <div className='text-4xl text-center font-semibold text-mine-shaft-100'>Trusted by <span className='text-cyan-/-aqua-500'>1000+</span> Companies</div>
      <div className="relative flex overflow-x-hidden">
  <div class="flex py-12 animate-marquee whitespace-nowrap space-x-8">
    {
      companies.map((company,index)=>
      <div key={index} className='inline-block mt-4 mx-4'>
        <img className='h-20' src={`/companies/${company}.png`} alt="company" />
      </div>)
    }
  </div>
</div>
      </div>
    
  )
}

export default Companies
