import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-100 mb-6">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <Label className="block text-sm font-medium text-gray-300">Email</Label>
              <Input
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                type="email"
                placeholder="Enter your Email"
                className="mt-1 block w-full border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <Label className="block text-sm font-medium text-gray-300">Password</Label>
              <Input
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                type="password"
                placeholder="Enter your Password"
                className="mt-1 block w-full border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md shadow-sm"
              />
            </div>

            <div className="flex items-center mb-4">
              <RadioGroup className="flex gap-4">
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="mr-2"
                  />
                  <Label htmlFor="r1" className="text-sm text-gray-300">Student</Label>
                </div>
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="mr-2"
                  />
                  <Label htmlFor="r2" className="text-sm text-gray-300">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-500 transition duration-150"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="mt-4 text-center">
              <Link to="/signup" className="text-blue-400 hover:underline">Don't have an account? Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
