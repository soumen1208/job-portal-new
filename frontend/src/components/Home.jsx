import React from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Category from './Category';
import LatestJobs from './LatestJobs';
import Footer from './Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import Companies from './admin/Companies';

const Home = () => {

    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    return (
        <div className='bg-[#e2f5ee]'>
            {
                user && user.role === 'recruiter' ?
                    (
                        <div className='bg-white'>
                            <Companies />
                        </div>
                    )
                    :
                    (
                        <>
                            <div className='fixed top-0 left-0 right-0 '>
                                <Navbar />
                            </div>
                            <div className='my-[4%]'>
                                <HeroSection />
                                <Category />
                                <LatestJobs />
                                <Footer />
                            </div>
                        </>
                    )
            }

        </div>
    )
}

export default Home;