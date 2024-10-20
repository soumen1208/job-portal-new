import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'


const CreateJobs = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { allCompanies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.messsage);
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.messsage);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 '>
                < Navbar />
            </div >
            <div className='max-w-4xl mx-auto my-28' >
                <div className='my-10'>
                    <h1 className='font-bold text-2xl '>Create New Job</h1>
                    <p className='text-gray-500'>What would you like to give your job role name? also you can change anytime </p>
                </div>

                <form onSubmit={submitHandler}>

                    <div className='grid grid-cols-2 gap-4 ' >

                        <div>
                            <Label>Job Role</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>JobType</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Eperience</Label>
                            <Input
                                type='text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className=' my-3 shadow-sm shadow-[#008080]'
                            />
                        </div>
                        {
                            allCompanies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Comanies</SelectLabel>
                                            {
                                                allCompanies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    <div className='flex flex-col items-center justify-end my-4'>
                        {
                            loading ? <Button className='w-full my-4 bg-[#008080]'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait... </Button> : <Button className='w-full my-4 bg-[#008080]' type='submit'>Job Post</Button>
                        }
                        <Button variant='outline' onClick={() => { navigate('/admin/jobs') }} className='w-full'>Cancel</Button>
                        {
                            allCompanies.length === 0 && <p className='text-xs text-red-600 my-3'>*Please register a company first, before posting a jobs</p>
                        }
                    </div>
                </form>


            </div >
        </div >
    )
}

export default CreateJobs