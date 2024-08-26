import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 my-5 bg-gray-900 dark:bg-gray-900">
          <form
            onSubmit={submitHandler}
            className="p-6 max-w-lg w-full border border-gray-700 shadow-lg rounded-md bg-gray-800 dark:bg-gray-800"
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-gray-300 dark:text-gray-300">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Salary</Label>
                <Input
                  type="text"
                  placeholder="in numbers LPA"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  placeholder="Full-time"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Experience</Label>
                <Input
                  type="number"
                  placeholder="in years"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              <div>
                <Label className="text-gray-300 dark:text-gray-300">Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                />
              </div>

              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler} className="mt-2 bg-gray-700 dark:bg-gray-700">
                  <SelectTrigger className="w-full bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            {loading ? (
              <Button className="w-full my-4 flex items-center justify-center bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-900">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-900">
                Post New Job
              </Button>
            )}
            {companies.length === 0 && (
              <p className="text-red-600 font-bold text-center my-3">
                Please register a company first, before posting a job
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PostJob;
