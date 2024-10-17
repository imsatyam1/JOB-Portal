import { Bookmark } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence/(1000*24*60*60));
  }

  return (
    <div className='rounded-md shadow-xl bg-white border border-gray-100 p-3  md:p-4 lg:p-6'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm text-gray-700'>{daysAgoFunction(job?.createdAt)===0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant-outline className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg md:text-xl lg:text-2xl'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500 md:text-base lg:text-lg'>{job?.company?.location}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg md:text-xl lg:text-2xl my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 md:text-base lg:text-lg'>{job?.location}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className={"text-blue-700 font-bold"}>Position :- {job?.position}</Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>{job?.jobType}</Badge>
        <Badge variant="ghost" className={"text-[#7209b7] font-bold"}>{job?.salary}</Badge>
        <Badge variant="ghost" className={"text-[#7209b7] font-bold"}>{job?.experienceLevel}</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick= {() => navigate(`/job/description/${job?._id}`)} variant="outline" className="md:w-1/2 lg:w-1/3">Details</Button>
        <Button className="bg-[#7209b7] md:w-1/2">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job