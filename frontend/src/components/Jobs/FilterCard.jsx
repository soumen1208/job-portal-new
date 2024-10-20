import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Kolkata", "Bangalore", "Hyderabad", "Pune", "Delhi"]
    },
    {
        filterType: "Industry",
        array: ["Frontend developer", "Backend developer", "Full stack developer", "UI/UX designer", "Data Scientist"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40-1lakh", "1-4lakh", "4-6lakh", "6-10lakh"]
    },
]

const FilterCard = () => {

    const [selectiveValue, setSelectiveValue] = useState('');
    const dispatch = useDispatch();

    const chnageHandler = (value) => {
        setSelectiveValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectiveValue))
    }, [selectiveValue])

    return (
        <div>
            <h1 className='font-md text-lg text-[#008080]'>Filter Jobs</h1>
            <hr className='mt-3' />

            <RadioGroup value={selectiveValue} onValueChange={chnageHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-md mx-3'>{data.filterType}</h1>
                            {
                                data.array.map((data, indx) => {
                                    const mId = `Id${index}-${indx}`
                                    return (
                                        <div className='flex space-x-2 my-2 items-center mx-5'>
                                            <RadioGroupItem value={data} id={mId} />
                                            <Label htmlFor={mId}> {data} </Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>

        </div>
    )
}

export default FilterCard