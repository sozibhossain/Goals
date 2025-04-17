"use client"

import React, { useEffect, useState } from 'react'
import Header from '../shared/header/Header'
import Banner from '../section/banner'
import FeatureSection from '../section/FeatureSection'
import MobileMockup from '../section/MobileMockup'
import UiCarouselMain from '../section/uicarousel/UiCarouselMain'
import FooterSections from '../section/footersection/footersections'
import { HomePageData } from '@/types/home'

function Home() {
    const [homeData, setHomeData] = useState<HomePageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHeaderData() {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setHomeData(data);
            } catch (error) {
                console.error('Failed to fetch header data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchHeaderData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!homeData) return <div className="flex justify-center items-center h-screen">No data available</div>;


    // console.log(homeData.header[0].itemlink1);
    const featuresId = homeData?.header?.[0]?.itemlink1?.replace("#", "") || "";
    const contactId = homeData?.header?.[0]?.itemlink2?.replace("#", "") || "";

    return (
        <div>
            {homeData.header && homeData.header[0] && (
                <Header headerData={homeData.header[0]} />
            )}

            {homeData.home && homeData.home[0] && (
                <Banner bannerData={homeData.home[0]} />
            )}

            <div id={featuresId}>
                {homeData.feature && homeData.feature[0] && (
                    <FeatureSection featureData={homeData.feature[0]} />
                )}
            </div>

            {homeData.mobile_mockup && homeData.mobile_mockup[0] && (
                <MobileMockup mockupData={homeData.mobile_mockup[0]} />
            )}

            {homeData.achive && homeData.achive[0] && (
                <UiCarouselMain achiveData={homeData.achive[0]} />
            )}

            <div id={contactId}>
                {homeData.footer && homeData.footer[0] && (
                    <FooterSections footerData={homeData.footer[0]} />
                )}
            </div>
        </div>
    )
}

export default Home