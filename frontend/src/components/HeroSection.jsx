import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    // const { searchJobByText } = useSelector(store => store.job)
    const [query, setQquery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-6'>
                <p className='text-red-500 font-bold text-sm mt-10'>Job Portal does not charge any amount for job placement. Beware of fraudsters who ask you to pay on the pretext of giving a job</p>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-bold'>No 1 Job Hunt Website</span>
                <h1 className='text-[#6495ED] font-bold text-5xl'>Search, Apply & <br /> get your <span className='text-[#008080] font-bold'>Dream Jobs</span></h1>
                <p></p>
                <div className='border border-gray-400 rounded-full w-[40%] pl-3 flex items-center mx-auto gap-4'>
                    <input onChange={(e) => setQquery(e.target.value)} type="text" name="" id="" placeholder='Find Your Dream Job' className='border-none outline-none w-11/12 bg-[#e2f5ee]' />
                    <Button className='rounded-r-full bg-[#008080]' onClick={searchJobHandler}>
                        <Search className='h-5 w-5 font-bold' />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection