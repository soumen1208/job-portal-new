import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {

            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (

        <div className='bg-[#a3dec8]'>

            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'> Job <span className='text-[#008080]' > Portal </span> </h1>
                </div>
                <div className='flex gap-10 items-ceter' >
                    <ul className='flex font-medium gap-5 items-center'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies">Companies</Link>
                                    <Link to="/admin/jobs" >Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className='text-[#008080]'>Home</Link>
                                    <Link to="/jobs" className='text-[#008080]'>Jobs</Link>
                                    <Link to="/browse" className='text-[#008080]'>Browse</Link>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex gap-2'>
                                <Link to='/login'>
                                    <Button variant="outline" className="rounded-full text-green-700 hover:bg-green-500">Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button variant="outline" className="bg-[#008080] rounded-full hover:bg-red-500">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='W-80'>
                                    <div className='flex gap-5 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user.profile.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-4 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            {
                                                user && user.role != 'recruiter' &&
                                                (<>
                                                    <User2 />
                                                    <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                                </>
                                                )
                                            }

                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>LogOut</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>


    )
}

export default Navbar