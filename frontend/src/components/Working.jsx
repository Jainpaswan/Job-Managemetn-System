import React from "react";
import { work } from "../utils/data";

const Working = () => {
  return (
    <div className="mt-10 pb-5">
      <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
        How it <span className="text-cyan-/-aqua-500">Works</span>
      </div>
      <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">
        Effortlessly navigate through the process and land your dream job.
      </div>
      <div className="flex gap-5 px-20 justify-between items-center ">
        <div className="flex-1 ">
          <img className="w-[30rem]" src="/girl.png" alt="girl" />
        </div>
        <div>
          <div className="flex flex-col gap-10">
            {
              work.map((works,index)=>
              <div key={index} className="flex items-center gap-4">
            <div className="p-3 bg-cyan-/-aqua-400 rounded-full"> 
              <img src={`/${works.name}.png`} alt={works.name} className="h-12 w-12" />
            </div>
            <div className="flex flex-col">
              <div className="text-mine-shaft-200 text-xl font-semibold">{works.name}</div>
              <div className="text-mine-shaft-300 w-full ">
               {works.desc}
              </div>
            </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
