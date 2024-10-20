import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LatestJobCard = ({ job }) => {

    const navigate = useNavigate();

    return (
        <div className='bg-white p-5 rounded-md shadow-xl border-gray-500 cursor-pointer'>
            <div onClick={() => { navigate(`/description/${job._id}`) }}>
                <div className='flex flex-row items-center gap-4'>
                    <img src={job?.company?.logo} alt="image" className='h-8 w-8' />
                    <h1 className='font-medium text-lg'> {job?.company?.name} </h1>
                </div>
                <p className='font-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'> {job?.title} </h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className='text-[#ba4a00] font-bold'> {job?.position} positions </Badge>
                <Badge variant='ghost' className='text-[#ca6f1e] font-bold'> {job?.jobType} </Badge>
                <Badge variant='ghost' className='text-[#d68910] font-bold'> {job?.salary} lpa </Badge>
            </div>

        </div>
    )
}

export default LatestJobCard