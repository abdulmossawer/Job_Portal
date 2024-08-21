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

const isResume = true;

const Profile = () => {
    useGetAppliedJobs() 
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
  
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border bg-grey-200 rounded-2xl my-5 p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>{user?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="mt-4 sm:mt-0" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex flex-wrap gap-1">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                        ) : (
                            <span>N/A</span>
                        )}
                    </div>
                </div>
                <div className="my-5">
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user?.profile?.resume}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    );
};

export default Profile;
