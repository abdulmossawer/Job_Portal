import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-10 md:my-20 px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl text-center font-semibold text-white">Latest Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 my-10">
        {allJobs?.slice(0, 6).map((job) => (
          <LatestJobCards key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
