import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminJobsTable = () => {

    const { allAdminJobs, searchJobsByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {

        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobsByText) {
                return true
            };
            return job?.company?.name?.toLowerCase().includes(searchJobsByText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase());
        });
        setFilterJob(filteredJob);

    }, [allAdminJobs, searchJobsByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAdminJobs.length <= 0 ? <span>You have not register any company yet</span> : (
                            <>
                                {
                                    filterJob?.map((job) => (
                                        <tr key={job._id}>
                                            <TableCell>{job.company.name}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell> {job.createdAt.split("T")[0]} </TableCell>
                                            <TableCell className='text-right'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className='w-38 mr-32'>
                                                        <div className='flex items-center gap-4 cursor-pointer mb-2' onClick={() => navigate(`/admin/companies/${job._id}`)}>
                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
                                                        <hr />
                                                        <div className='flex items-center gap-4 cursor-pointer mt-2' onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                                            <Eye className='w-4' />
                                                            <span>Applicants</span>
                                                        </div>

                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                    ))
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default AdminJobsTable