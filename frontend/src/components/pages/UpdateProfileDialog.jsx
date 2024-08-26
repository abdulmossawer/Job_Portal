import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: user?.profile?.resume || ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] w-full max-w-[90%] mx-auto bg-gray-900 text-gray-300"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 p-4">
            {[
              { id: "fullname", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "phoneNumber", label: "Phone Number", type: "text" },
              { id: "bio", label: "Bio", type: "text" },
              { id: "skills", label: "Skills", type: "text" },
              { id: "file", label: "Resume", type: "file" },
            ].map(({ id, label, type }) => (
              <div key={id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right sm:text-left text-gray-400">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={type === "file" ? undefined : input[id]}
                  onChange={type === "file" ? fileChangeHandler : changeEventHandler}
                  className="col-span-3 w-full bg-gray-800 text-gray-300 border-gray-700"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              type="button"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-500"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
