import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompaniesByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompaniesByText(input))
    }, [input])

    return (
        <div className='bg-[#e2f5ee] h-[100vh]'>
            <div className='fixed top-0 left-0 right-0 '>
                <Navbar />
            </div>
            <div className='max-w-6xl mx-auto my-[4.2%]'>
                <div className='flex items-center justify-between my-5 pt-12 '>
                    <Input className='w-fit' placeholder='Filter by name' onChange={(e) => setInput(e.target.value)} />
                    <Button onClick={() => { navigate('/admin/companies/create') }} className='bg-[#008080]'> New Company </Button>
                </div>

                <CompaniesTable />

            </div>
        </div>
    )
}

export default Companies