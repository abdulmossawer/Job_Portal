import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    console.log('called');
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

return (
    <div>
        <Table>
            <TableCaption className="text-white">A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-white">FullName</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Contact</TableHead>
                    <TableHead className="text-white">Resume</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-right text-white">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants && applicants?.applications?.map((item) => (
                        <tr key={item._id}>
                            <TableCell className="text-white">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="text-white">{item?.applicant?.email}</TableCell>
                            <TableCell className="text-white">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell  className="text-white">
                                {
                                    item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                }
                            </TableCell>
                            <TableCell className="text-white">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="float-right cursor-pointer text-white">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {
                                            shortlistingStatus.map((status, index) => {
                                                return (
                                                    <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        <span>{status}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </PopoverContent>
                                </Popover>

                            </TableCell>

                        </tr>
                    ))
                }

            </TableBody>

        </Table>
    </div>
)
}

export default ApplicantsTable;
