import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "../shared/Footer";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-gray-200">
        <Navbar />
        <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl my-5 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="font-medium text-lg sm:text-xl text-white">
                  {user?.fullname}
                </h1>
                <p className="text-gray-400">{user?.bio}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="mt-4 sm:mt-0 border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
              variant="outline"
            >
              <Pen className="text-gray-200" />
            </Button>
          </div>
          <div className="my-4 sm:my-5">
            <div className="flex flex-col sm:flex-row items-center gap-3 my-2 text-gray-300">
              <Mail />
              <span>{user?.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 my-2 text-gray-300">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div className="my-4 sm:my-5">
            <h1 className="text-white text-lg sm:text-xl">Skills</h1>
            <div className="flex flex-wrap gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="bg-gray-600 text-gray-200">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
          </div>
          <div className="my-4 sm:my-5">
            <Label className="text-md font-bold text-white">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 sm:p-8">
          <h1 className="font-bold text-lg sm:text-xl text-white my-5">
            Applied Jobs
          </h1>
          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
