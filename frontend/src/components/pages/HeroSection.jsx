import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 md:px-0">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-800 text-orange-500 font-medium text-sm md:text-base">
          Premier Job Search Site
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Browse, Apply, &<br /> Unlock Your Career Potential! 
          <span className="text-indigo-400"> Dream Jobs</span>
        </h1>
        <p className="text-sm md:text-base text-gray-300">
          Discover and apply for exciting job opportunities that match your skills and goals. Start your journey towards your ideal career today!
        </p>
        <div className="flex w-full md:w-[40%] shadow-lg border border-gray-600 pl-3 rounded-full items-center gap-4 mx-auto bg-gray-700">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm md:text-base bg-transparent text-white placeholder-gray-400"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-indigo-600 text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
