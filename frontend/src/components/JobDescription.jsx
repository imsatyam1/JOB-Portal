import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';

const isApplied = true;
function JobDescription() {
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>Title</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">Job Type</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">Salary</Badge>
                </div>
            </div>
            <Button disabled={isApplied} className={`rounded-lg ${isApplied ? `bg-gray-600 cursor-not-allowed`:`bg-[#7209b7] hover:bg-[#5f32ad]`}`}>{isApplied ? `Already Applied`: `Apply Now`}</Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
            <div className='flex'>
            <h1 className='font-bold my-1'>Role: <Badge className='mx-4 pl-4 font-nomal bg-gray-800 px-2 py-1'>Softwere Engineer</Badge></h1>
            <h1 className='font-bold my-1'>Location: <Badge className='mx-2 pl-4 font-nomal bg-gray-800 px-2 py-1'>Noida</Badge></h1>
            </div>
            <h1 className='font-bold my-1 mt-3'>Description: <div className='mt-3 mb-3 border border-2 border-rounded-lg py-2 px-4  font-nomal text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At natus cum odit repudiandae reprehenderit voluptates nam ea repellendus facilis labore? Provident vel autem totam aperiam hic libero cupiditate adipisci? Obcaecati!</div></h1>
            <div className='flex'>
            <h1 className='font-bold my-1 px-2 p-1.5'>Experience: <Badge className='mx-3 px-2 py-1 font-nomal text-red-300 bg-gray-800'>2-5 years</Badge></h1>
            <h1 className='font-bold my-1 px-2 py-1.5'>Salary: <Badge className='mx-3 font-nomal bg-gray-800 px-2 py-1'>7 LPA</Badge></h1>
            </div>
            <h1 className='font-bold my-1 px-2 py-1.5'>Total Applicants: <span className='pl-4 font-nomal text-gray-800'>12000</span></h1>
            <h1 className='font-bold my-1 px-2 py-1.5'>Posted Date: <span className='pl-4 font-nomal text-gray-800'>20-08-2024</span></h1>
        </div>
    </div>
  )
}

export default JobDescription