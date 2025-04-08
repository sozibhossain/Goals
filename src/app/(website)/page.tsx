import React from 'react'
import Banner from '../components/section/banner'
import FeatureSection from '../components/section/FeatureSection'
import MobileMockup from '../components/section/MobileMockup'

function page() {
  return (
    <div>
        <Banner/>
        <FeatureSection/>
        <MobileMockup/>
    </div>
  )
}

export default page