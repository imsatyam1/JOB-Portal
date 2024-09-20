import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';

const jobsArray = [1,2,3,4,5,6,7,8];

function Jobs() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex flex-wrap gap-5'>
          <div className='w-full md:w-1/4 lg:w-1/5 xl:w-1/6'>
            <FilterCard />
          </div>
          {
            jobsArray.length <= 0 ? (
              <span className='text-lg font-bold text-gray-500'>Job not found</span>
            ) : (
              <div className='flex-1 h-screen overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    jobsArray.map((item, index) => (
                      <div key={index}>
                        <Job />
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Jobs