import React from 'react'
import LatestJobCards from './LatestJobCards';

const randomJobs = [1,2,3,4,5,6,7,8];

function LatestJobs() {
  return (
    <div>
      <div className='max-w-full mx-auto my-20 md:my-30 lg:my-40'>
        <h1 className="text-4xl font-bold mx-3 md:text-5xl lg:text-6xl"><span className="text-blue-600">Latest & Top </span>Job Opening
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
            {
            randomJobs.slice(0,6).map((item, index) => <LatestJobCards />) 
            }
        </div>
      </div>
    </div>
  )
}

export default LatestJobs