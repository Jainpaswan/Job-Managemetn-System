import React, { useEffect, useRef, useState } from 'react'
import { jobCategory } from '../utils/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobCategory = () => {
  const [currentIndex,setCurrentIndex]=useState(0);
  const carouselRef=useRef(null);
  const scroll=(direction)=>{
    if(carouselRef.current){
      const scrollAmount=direction==="left"? -300:300;
      carouselRef.current.scrollBy({left:scrollAmount,behavior:"smooth"})
    }
  };
  useEffect(()=>{
    const handleScroll=()=>{
      if(carouselRef.current){
        const scrollPosition=carouselRef.current.scrollLeft;
        const cardWidth=300;
        const newIndex=Math.round(scrollPosition/cardWidth);
        setCurrentIndex(newIndex);
      }
    };
    const currentCarouselRef = carouselRef.current;
    currentCarouselRef?.addEventListener("scroll", handleScroll);
    return () => currentCarouselRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='mt-10 pb-5' id='services'>
        <div className='text-4xl text-center mb-3 font-semibold text-mine-shaft-100'>Browse
            <span className='text-cyan-/-aqua-500'> Job </span>Category
        </div>
        <div className='text-lg text-mine-shaft-300 text-center w-1/3 mx-auto'>Explore diverse job opportunities tailored to your skills.Start your career today!</div>
        <div>
            <div className='relative w-full mx-auto p-4 bg-mine-shaft-950 text-white'>
              <div ref={carouselRef} className='flex items-center justify-center space-x-4 overflow-hidden'>
                <button onClick={()=>scroll("left")} className='p-2 rounded-full bg-cyan-/-aqua-600 text-mine-shaft-100 hover:bg-cyan-400'>
                <ChevronLeft className='w-6 h-6'/>
                </button>
                <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full  bg-cyan-/-aqua-600 text-mine-shaft-100 hover:bg-cyan-400">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className='flex overflow-x-auto space-x-4 pb-4 '
        style={{scrollbarWidth:'none',msOverflowStyle:'none'}}
      >
        {jobCategory.map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] snap-center bg-mine-shaft-900 rounded-lg p-6 text-white border border-cyan-/-aqua-300 
            hover:cursor-pointer hover:shadow-[0_0_5px_1px_cyan] shadow-cyan-600"
          >
            <div className="w-12 h-12 bg-cyan-/-aqua-500 rounded-full flex items-center justify-center mb-4  ">
              <category.icon className="w-6 h-6 text-mine-shaft-900" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
            <p className="text-mine-shaft-200 mb-4">{category.description}</p>
            <p className="text-cyan-/-aqua-400 ">{category.jobs}</p>
          </div>
        ))}
      </div>
        </div>
    </div>
  )
}

export default JobCategory