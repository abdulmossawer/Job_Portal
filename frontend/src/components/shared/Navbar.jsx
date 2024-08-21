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
    <div className="bg-white">
      <div className="flex items-center justify-between px-4 md:px-8 mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Employ<span className="text-[#F83002]"> Hunter</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-12">
          <ul className="flex font-medium items-center gap-2 md:gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to={"/admin/companies"}> Companies </Link></li>
                <li><Link to={"/admin/jobs"}> Jobs </Link></li>
              </>
            ) : (
              <>
                <li><Link to={"/"}> Home </Link></li>
                <li><Link to={"/jobs"}> Jobs </Link></li>
                <li><Link to={"/browse"}> Browse </Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/login">
                <Button variant="outline" className="text-sm md:text-base">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="text-sm md:text-base">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="user-avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 md:w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="user-avatar" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm md:text-base">{user?.fullname}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to={"/profile"}> View Profile </Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
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
