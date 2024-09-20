import { Bookmark } from 'lucide-react'
import React from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job() {
  const navigate = useNavigate();
  const jobId = "lsekdhjgdsnfvsdkjf";

  return (
    <div className='rounded-md shadow-xl bg-white border border-gray-100 p-3  md:p-4 lg:p-6'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm text-gray-700'>2 Days ago</p>
        <Button variant-outline className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'/>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg md:text-xl lg:text-2xl'>Company Name</h1>
          <p className='text-sm text-gray-500 md:text-base lg:text-lg'>Location</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg md:text-xl lg:text-2xl my-2'>Job Title</h1>
        <p className='text-sm text-gray-600 md:text-base lg:text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste illo at adipisci veniam rerum, neque suscipit magnam sint nesciunt non. Nesciunt sequi ab eum fugit error provident, magnam enim reiciendis.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className={"text-blue-700 font-bold"}>Position</Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>Job Type</Badge>
        <Badge variant="ghost" className={"text-[#7209b7] font-bold"}>Salary</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick= {() => navigate(`/job/description/${jobId}`)} variant="outline" className="md:w-1/2 lg:w-1/3">Details</Button>
        <Button className="bg-[#7209b7] md:w-1/2">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job