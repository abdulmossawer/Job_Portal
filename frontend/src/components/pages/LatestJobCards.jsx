import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 md:p-5 rounded-md shadow-xl bg-gray-800 border border-gray-700 cursor-pointer transition-transform duration-200 hover:scale-105"
    >
     
      <div>
        <h1 className="font-medium text-base md:text-lg text-white">{job?.company?.name}</h1>
        <p className="text-xs md:text-sm text-gray-400">India</p>
      </div>
      <div>
        <h1 className="font-bold text-base md:text-lg my-2 text-white">{job?.title}</h1>
        <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-300 bg-gray-700 font-bold text-xs md:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-400 bg-gray-700 font-bold text-xs md:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-300 bg-gray-700 font-bold text-xs md:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
