import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import UseGetAllCompanies from '@/hooks/UseGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import Footer from '../shared/Footer';

const Companies = () => {
    UseGetAllCompanies();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <>
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-full sm:w-64 bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 border-gray-600 dark:border-gray-600"
                        placeholder="Filter by name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button  className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded" onClick={() => navigate("/admin/companies/create")}>Create New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Companies;
