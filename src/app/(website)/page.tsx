import React from 'react'
import Banner from '../components/section/banner'
import FeatureSection from '../components/section/FeatureSection'
import MobileMockup from '../components/section/MobileMockup'
import UiCarouselMain from '../components/section/uicarousel/UiCarouselMain'
import Header from '../components/shared/header/Header'
import FooterSections from '../components/section/footersection/footersections'

function page() {
  return (
    <div>
        <Header/>
        <Banner/>
        <FeatureSection/>
        <MobileMockup/>
        <UiCarouselMain/>
        <FooterSections/> 
    </div>
  )
}

export default page