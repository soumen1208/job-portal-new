import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {

    const { allCompanies, searchCompaniesByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(allCompanies);
    const navigate = useNavigate();

    useEffect(() => {

        const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company) => {
            if (!searchCompaniesByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompaniesByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);

    }, [allCompanies, searchCompaniesByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of registered Comapanies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allCompanies.length <= 0 ? <span>You have not register any company yet</span> : (
                            <>
                                {
                                    filterCompany?.map((company) => (
                                        <tr>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company.logo} />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell> {company.createdAt.split("T")[0]} </TableCell>
                                            <TableCell className='text-right'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className='mr-32 w-32'>
                                                        <div className='flex items-center gap-4 cursor-pointer' onClick={() => navigate(`/admin/companies/${company._id}`)}>
                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
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

export default CompaniesTable