import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './categoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

function Home() {
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