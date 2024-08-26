import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Kolkata", "Bangalore", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Java Developer",
      "Python Developer",
      "MERN Stack Developer",
      "FULL STACK Developer",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-gray-800 p-4 md:p-5 rounded-md shadow-md">
      <h1 className="font-bold text-base md:text-lg text-white">Filter Jobs</h1>
      <hr className="mt-3 border-gray-600" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-sm md:text-base mt-4 text-gray-300">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} className="bg-gray-700 text-gray-200" />
                  <Label htmlFor={itemId} className="text-sm md:text-base text-gray-200">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
