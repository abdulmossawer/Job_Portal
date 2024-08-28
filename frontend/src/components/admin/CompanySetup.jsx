import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import Footer from "../shared/Footer";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <>
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 my-5 bg-gray-900 dark:bg-gray-900">
        <form
          onSubmit={submitHandler}
          className="p-6 max-w-lg w-full border border-gray-700 shadow-lg rounded-md bg-gray-800 dark:bg-gray-800"
        >
          <div className="flex items-center gap-5 p-4 sm:p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-lg text-white sm:text-xl">
              Company Setup
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 dark:text-gray-300">
                Company Name
              </Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="text-gray-300 dark:text-gray-300">
                Description
              </Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="text-gray-300 dark:text-gray-300">Website</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="text-gray-300 dark:text-gray-300">
                Location
              </Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label className="text-gray-300 dark:text-gray-300">Logo</Label>
              <Input
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 flex items-center justify-center bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-900">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              variant="outline"
              type="submit"
              className="w-full my-4 bg-blue-600 dark:bg-blue-800 text-white dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-900"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default CompanySetup;
