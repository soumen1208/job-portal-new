import React from 'react'

import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {

    const navigate = useNavigate();

    const daysAgoFunc = (mongoTime) => {
        const createdAt = new Date(mongoTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='shadow-[#008080] shadow-md p-2 rounded-md bg-white border border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" : `${daysAgoFunc(job?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full h-8 w-8' size='icon'><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>

                <div>
                    <h1 className='text-md font-bold'> {job?.company?.name} </h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold'> {job?.title} </h1>
                <p className='text-sm text-gray-400'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant='ghost' className='text-[#ba4a00] font-bold'>{job?.position} positions</Badge>
                <Badge variant='ghost' className='text-[#ca6f1e] font-bold'>{job?.jobType}</Badge>
                <Badge variant='ghost' className='text-[#d68910] font-bold'> {job?.salary} lpa </Badge>
            </div>
            <div className='flex justify-between gap-4 mt-4'>
                <Button variant='outline' className='rounded-full border border-gray-400' onClick={() =>
                    navigate(`/description/${job?._id}`)
                } >Details</Button>
                <Button className='bg-[#008080]'>Save for later</Button>
            </div>

        </div >
    )
}

export default Job