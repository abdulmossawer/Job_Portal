import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-white">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white">Company Name</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell  className="text-white"> {job?.company?.name}</TableCell>
                            <TableCell className="text-white">{job?.title}</TableCell>
                            <TableCell className="text-white">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right text-white">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48">
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 cursor-pointer mt-2'>
                                            <Eye className='w-4' />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
