import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import Footer from '../shared/Footer';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <>
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <h1 className='font-bold text-xl mb-5 text-white'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Applicants;
