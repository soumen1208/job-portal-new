import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-10'>

            <h1 className='text-4xl font-bold'><span className='text-[#008080]'>Latest & Top </span>Job Openings</h1>

            {/* showing multiple card */}
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No jobs available</span> : allJobs.slice(0, 6).map((job) => (
                        <LatestJobCard key={job._id} job={job} />
                    ))
                }

            </div>

        </div>
    )
}

export default LatestJobs