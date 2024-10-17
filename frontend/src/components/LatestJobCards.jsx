import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({job}) {
  return (
    <div onClick={() => useNavigate(`/description/${job._id}`)} className='mx-3 p-3 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
      <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
      <p className='text-sm text-grey-500'>{job?.company?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.Title}</h1>
        <hr className='font-bold text-lg my-2'/>
        <h2>Job Requirment</h2><br />
        <p className='text-sm text-grey-600'>{job?.requirments?.map(requirment => requirment)} || No requirment</p>
        <hr />
        <p className='text-sm text-grey-600'>Experience :- {job?.experienceLevel} Years</p>
        <hr />
        <p className='text-sm text-grey-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className={'text-blue-700 font-bold'}>Position - {job?.position}</Badge>
        <Badge variant="ghost" className={"text-[#F83002] font-bold"}>{job?.jobType}</Badge>
        <Badge variant = "ghost" className={"text-[#7209b7] font-bold"}>{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
