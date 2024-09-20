import React from 'react'
import { Badge } from './ui/badge'

function LatestJobCards() {
  return (
    <div className='mx-3 p-3 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
      <h1 className='font-medium text-lg'>Company Name</h1>
      <p className='text-sm text-grey-500'>Location</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Job Title</h1>
        <p className='text-sm text-grey-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta voluptatem voluptates ad illum beatae adipisci, temporibus, magnam minima dolore dolorem optio! Autem deleniti doloremque quasi commodi aut vel soluta numquam.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className={'text-blue-700 font-bold'}>Position - 12</Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>Job Type</Badge>
        <Badge variant = "ghost" className={"text-[#7209b7] font-bold"}>Salary</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
