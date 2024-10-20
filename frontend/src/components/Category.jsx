import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mern Stack Developer",
    "UI/UX designer",
    "Graphic Designer",
    "Data Scientist"
]

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }
    return (
        <div>
            <Carousel className='w-full max-w-lg  mx-auto'>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis" key={cat}>
                                <Button onClick={() => searchJobHandler(cat)} variant='outline' className='text-gray-100 bg-[#008080] rounded-full'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default Category