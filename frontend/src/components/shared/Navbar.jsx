import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="flex items-center justify-between px-4 md:px-8 mx-auto max-w-7xl h-16 ">
      <div className="flex items-center justify-center">
  <img
    src="/logo.png"
    alt="Employ Hunter Logo"
    className="w-20 h-20 md:w-24 md:h-24"
  />
</div>


        <div className="flex items-center gap-4 md:gap-12">
          <ul className="flex font-medium items-center gap-2 md:gap-5 text-gray-300">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to={"/admin/companies"}
                    className="hover:text-indigo-400"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"} className="hover:text-indigo-400">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"} className="hover:text-indigo-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/jobs"} className="hover:text-indigo-400">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to={"/browse"} className="hover:text-indigo-400">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-sm md:text-base text-gray-300 border-gray-700 hover:text-indigo-400"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-sm md:text-base bg-indigo-600 text-white hover:bg-indigo-400">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="user-avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 md:w-80 bg-gray-800 text-gray-100">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="user-avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm md:text-base text-white">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-400">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 className="text-gray-300" />
                        <Button
                          variant="link"
                          className="text-gray-300 hover:text-orange-500"
                        >
                          <Link to={"/profile"}>View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut className="text-gray-300" />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="text-gray-300 hover:text-orange-500"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
