import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job);

    return (
        <div className="overflow-x-auto">
            <Table className="w-full min-w-[600px] bg-gray-800 text-gray-200 border border-gray-700">
                <TableCaption className="text-gray-400">A list of your applied jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Job Role</TableHead>
                        <TableHead className="text-gray-300">Company</TableHead>
                        <TableHead className="text-right text-gray-300">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-gray-400">You haven't applied to any jobs yet.</TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`text-white ${appliedJob?.status === "rejected" ? 'bg-red-600' : appliedJob.status === 'pending' ? 'bg-gray-600' : 'bg-green-600'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
