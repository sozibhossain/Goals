import Image from 'next/image'
import React from 'react'
import ClientCarousel from './Carousel'
import { AchiveData } from '@/types/home'

export default function UiCarouselMain({ achiveData }: { achiveData: AchiveData }) {
    return (
        <section
            className="py-16 lg:py-28 relative overflow-hidden rounded-t-[20px] mt-[-20px]"
            style={{
                background: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Achieve/${achiveData?.back_img}) no-repeat center / cover`
            }}
        >
            <div className="container">
                <div className="flex lg:flex-row flex-col justify-between lg:items-center space-y-8">
                    {/* {/ Left side /} */}
                    <div className="lg:w-[35%] w-full text-center">
                        <div className="">
                            <div className="lg:pb-24 flex justify-center lg:block">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Achieve/${achiveData?.logo_img}`}
                                    alt='logo'
                                    width={200}
                                    height={220}
                                    className='w-[150px] h-[180px] lg:w-[200px] lg:h-[220px]'
                                />
                            </div>
                            <div className="">
                                <h3 className='lg:text-5xl text-white lg:pb-8'>{achiveData?.title1}</h3>
                                <p className='lg:text-[32px] text-white lg:pb-8 opacity-70'>{achiveData?.title2}</p>
                            </div>
                        </div>
                    </div>

                    {/*Right side - Carousel */}
                    <div className="lg:w-[60%] w-full">
                        <ClientCarousel  achiveData={achiveData}/>
                    </div>
                </div>
            </div>
        </section>
    )
}