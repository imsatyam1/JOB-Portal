import React, {useEffect} from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './categoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user.workstatus === "recruiter") {
  //     navigate("")
  //   }
  // },[])
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer /> 
    </div>
  )
}

export default Home