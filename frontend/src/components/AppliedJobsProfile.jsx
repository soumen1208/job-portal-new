import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsProfile = () => {

    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div>
            <Table>
                <TableCaption> - A list of your jobs - </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You have not apply any job</span> : allAppliedJobs.map((items) => (
                            <TableRow key={items._id}>
                                <TableCell>{items.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{items.job.title}</TableCell>
                                <TableCell>{items?.job?.company?.name}</TableCell>
                                <TableCell className='text-right'>
                                    <Badge className={`${items?.status === "reject" ? 'bg-red-500' : items?.status === "pending" ? 'bg-gray-500' : 'bg-green-500'}`}>
                                        {items.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>

    )

}

export default AppliedJobsProfile