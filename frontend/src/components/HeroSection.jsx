import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
// import setSearchedQuery from ' @/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
  return (
    <div className='text-center'>
        <div className="flex flex-col gap-5 my-10 md:my-20 lg:my-30">
            <span className="mx-auto sm:xl md:2xl px-4 py-2 rounded-full bg-[#000000] text-[#FF5733] front-medium font-bold">No. 1 Hob Hunting Website</span>
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">Search, Apply & <br />Get Your <span className="text-blue-600">Dream Jobs</span></h1>
            <div className="flex w-full md:w-1/2 lg:w-1/3 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                <input 
                type="text" 
                placeholder='Find your dream jobs?'
                className= 'ouline-none border-none w-full'
                onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                onClick = {searchJobHandler} 
                className="rounded-r-full bg-blue-600">
                    <Search className= 'h-5 w-5' />
                </Button>
            </div>
        </div>
    </div>
  )
}
 
export default HeroSection