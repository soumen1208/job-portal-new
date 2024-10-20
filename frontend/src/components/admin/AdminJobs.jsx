import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobsByText } from '@/redux/jobSlice'


const AdminJobs = () => {
    useGetAllAdminJobs();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobsByText(input))
    }, [input])

    return (
        <div className='bg-[#e2f5ee] h-[100vh]'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 bg-[#e2f5ee]'>
                <div className='flex items-center justify-between my-5 '>
                    <Input className='w-fit' placeholder='Filter by company or role' onChange={(e) => setInput(e.target.value)} />
                    <Button onClick={() => { navigate('/admin/jobs/create') }} className='bg-[#008080]'> New Jobs </Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs;