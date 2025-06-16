import React from 'react'
import HeroSection from '../components/HeroSection'
import InvestmentOpp from '../components/InvestmentOpp'
import Features from '../components/Features'
import DataShow from '../components/DataShow'
import StartSI from '../components/StartSI'

const Homepage = () => {
  return (
    <div>
        <HeroSection />
        <DataShow />
        <InvestmentOpp />
        <Features />
        <StartSI />
    </div>
  )
}

export default Homepage
