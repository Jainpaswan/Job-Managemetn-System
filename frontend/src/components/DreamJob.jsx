import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const DreamJob = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return alert("Please enter a job title or keyword");
    navigate(`/search-results?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <div className="bg-mine-shaft-950 min-h-screen flex flex-col lg:flex-row items-center justify-center p-6">
      {/* Left Side */}
      <div className="flex flex-col w-full lg:w-[50%] gap-2">
        <div className="text-4xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
          Find your <span className="text-cyan-500">dream job</span> with us
        </div>
        <div className="text-md md:text-lg font-medium text-white">
          Good life begins with a good company. Start exploring thousands of jobs at one place.
        </div>

        {/* Search Inputs */}
      <div className="flex flex-col md:flex-row items-end gap-4 mt-6">
  {/* Input Field */}
  <div className="flex flex-col w-full md:flex-1">
    <label className="text-black font-medium mb-2" htmlFor="keyword">
      Job Keyword
    </label>
    <input
      id="keyword"
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Search by job title or keyword"
      className="py-3 px-4 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
    />
  </div>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="bg-cyan-500 md:w-[120px] w-full h-[48px] flex items-center justify-center rounded-md hover:bg-cyan-600 transition"
  >
    <AiOutlineSearch className="text-white text-2xl" />
  </button>
</div>

      </div>

      {/* Right Side Image */}
      <div className="w-full lg:w-[50%] flex items-center justify-center mt-8 lg:mt-0">
        <div className="w-[20rem] md:w-[25rem] lg:w-[30rem]">
          <img src="/dreamjob.png" alt="Dream Job" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
