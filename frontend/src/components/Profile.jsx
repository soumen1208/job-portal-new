import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobsProfile from './AppliedJobsProfile'
import UpddateProfileDialouge from './UpddateProfileDialouge'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const isResume = true;

const Profile = () => {

    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl bg-white border border-gray-200 mx-auto rounded-2xl my-5 p-8'>
                <div className=' flex justify-between'>
                    <div className='flex flex-row items-center gap-10'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user.profile.profilePhoto} alt='profile' />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-lg'>{user.fullname}</h1>
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant='outline' className=''><Pen /></Button>
                </div>
                <div className='my-3 space-y-3'>
                    <div className='flex flex-row gap-3'>
                        <Mail /> <span> {user.email} </span>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <Contact /> <span> {user.phoneNumber} </span>
                    </div>
                </div>
                <div className='m-5'>
                    <h1>Skills</h1>
                    <div className='space-x-3 my-3'>
                        {
                            user.profile.skills.length != 0 ? user.profile.skills.map((item, index) => (<Badge key={index}>{item}</Badge>))
                                :
                                <span>You have to add skills for upcoming job</span>
                        }
                    </div>
                </div>
                <div className='mx-5'>
                    {
                        isResume ? <a target='blank' href={user.profile.resume} className='hover:underline hover:text-green -500 text-blue-500 '>{user.profile.resumeOriginalName}</a> : <span>Not Applicable</span>
                    }
                </div>
            </div>
            <div className='max-w-7xl bg-white mx-auto rounded-2xl border border-gray-200'>
                <h1 className='text-center font-bold text-xl text-[#008080]'>Applied Jobs</h1>
                {/* application table */}
                <AppliedJobsProfile />

            </div>

            <UpddateProfileDialouge open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile