import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const shortlisted = ['accepted', 'rejected']

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}`, { status }, { withCredentials: true });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='mt-10'>
            <Table>
                <TableCaption>A list of your applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right' >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item.applicant.fullname}</TableCell>
                                <TableCell>{item.applicant.email}</TableCell>
                                <TableCell>{item.applicant.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant.profile.resume ? <a href={item.applicant.profile.resume} className='text-blue-700 font-semibold' > {item.applicant.profile.resumeOriginalName} </a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32 mr-32'>
                                            {
                                                shortlisted.map((status, index) => {
                                                    return (
                                                        <div onClick={() => { statusHandler(status, item?._id) }} key={index} className='cursor-pointer flex intems-center justify-center'>
                                                            {status}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable