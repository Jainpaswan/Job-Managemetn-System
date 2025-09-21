import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import  '../App.css';

const DreamJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');

  const handleSearch = () => {
    console.log("Job Title:", jobTitle, "Job Type:", jobType);
  };

  return (
    <div className="bg-mine-shaft-950 min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 ">
     
      <div className="flex flex-col w-full lg:w-[50%] gap-2 lg:mb-0">
        <div className="text-4xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
          Find your <span className="text-cyan-500">dream job</span> with us
        </div>
        <div className="text-md md:text-lg font-medium text-white">
          Good Life begins with a good company. Start explore thousands of jobs at one place.
        </div>

        
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-white font-medium mb-2" htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Search by job title"
              className="py-2 px-4 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-white font-medium mb-2" htmlFor="jobType">Job Type</label>
            <input
              id="jobType"
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="Search by job type"
              className="py-2 px-4 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

         
          <button
            onClick={handleSearch}
            className="bg-cyan-500 p-4 flex items-center justify-center rounded-md hover:bg-cyan-/-aqua-600 w-1/6 h-10  mt-8"
          >
            <AiOutlineSearch className="text-white text-4xl" />
          </button>
        </div>
      </div>

     
      <div className="w-full lg:w-[50%] flex items-center justify-center">
        <div className="w-[20rem] md:w-[25rem] lg:w-[30rem]">
          <img src="/dreamjob.png" alt="Dream Job" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
