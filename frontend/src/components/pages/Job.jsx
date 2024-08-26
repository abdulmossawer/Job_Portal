import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-4 md:p-5 rounded-md shadow-lg bg-gray-800 border border-gray-700">
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full text-gray-300 border-gray-500 hover:bg-gray-700"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-4 md:p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-sm md:text-lg text-gray-100">
            {job?.company?.name}
          </h1>
          <p className="text-xs md:text-sm text-gray-400">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-sm md:text-lg my-2 text-gray-100">
          {job?.title}
        </h1>
        <p className="text-xs md:text-sm text-gray-300">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-400 bg-gray-700 font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-red-400 bg-gray-700 font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-purple-400 bg-gray-700 font-bold text-xs md:text-sm"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-gray-200 border-gray-600 hover:bg-gray-700 hover:text-white"
        >
          Details
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-500">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
