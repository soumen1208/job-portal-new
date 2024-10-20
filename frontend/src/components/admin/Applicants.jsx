import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const getAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                // console.log(res.data);
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        }
        getAllApplicants();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='max-w-7xl mx-auto'>
                <div className='mt-10'>
                    <h1 className='font-bold text-lg'>Applicants ({applicants.applications.length})</h1>
                </div>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants