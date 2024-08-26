import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import Footer from '../shared/Footer';

const AdminJobs = () => {
  useGetAllAdminJobs();
  
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <>
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between my-5'>
          <Input
            className="w-full sm:w-auto bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="mt-4 sm:mt-0 bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded" onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminJobs;
