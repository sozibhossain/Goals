import React from 'react'
import Banner from '../components/section/banner'
import FeatureSection from '../components/section/FeatureSection'
import MobileMockup from '../components/section/MobileMockup'
import UiCarouselMain from '../components/section/uicarousel/UiCarouselMain'
import Footer from '../components/section/footersection/footer'

function page() {
  return (
    <div>
        <Banner/>
        <FeatureSection/>
        <MobileMockup/>
        <UiCarouselMain/>
        <Footer/> 
    </div>
  )
}

export default page