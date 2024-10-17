import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';


const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["FrontEnd Developer", "BackEnd Developer", "FullStack Developer", "Python Developer", "ReactJS Developer"]
    },
    {
        filterType: "Salary",
        array:["1-3 LPA", "3-6 LPA", "6-10 LPA", ">10 LPA"]
    },
]

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='flex flex-col w-full bg-white rounded-md p-4 md:p-6 lg:p-8'>
      <h1 className='font-bold text-lg mb-2'>Filter Jobs</h1>
      <hr className='mt-3 mb-4'/>
      <RadioGroup value={selectedValue} onValueChange= {changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index} className='mb-4'>
              <h1 className='font-bold text-lg pt-2'>{data.filterType}</h1>
              {
                data.array.map((items, index) => (
                  <div key={index} className='flex items-center space-x-2 my-2'>
                    <RadioGroupItem value={items} />
                    <Label className='px-2'>{items}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard