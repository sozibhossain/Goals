import Image from 'next/image'
import React from 'react'
import ClientCarousel from './Carousel'

export default function UiCarouselMain() {
    return (
        <section className='py-16 lg:py-28 relative overflow-hidden rounded-t-[20px] mt-[-20px]' style={{ background: "url('/assets/banner.png') no-repeat center / cover" }}>
            <div className="container">
                <div className="flex lg:flex-row flex-col justify-between lg:items-center space-y-8">
                    {/* {/ Left side /} */}
                    <div className="lg:w-[35%] w-full text-center">
                        <div className="">
                            <div className="lg:pb-24 flex justify-center lg:block">
                                <Image
                                    src="/assets/uicarousel/logo.png"
                                    alt='logo'
                                    width={200}
                                    height={220}
                                    className='w-[150px] h-[180px] lg:w-[200px] lg:h-[220px]'
                                />
                            </div>
                            <div className="">
                                <h3 className='lg:text-5xl text-white lg:pb-8'>Achieve Your Goals with Ease!</h3>
                                <p className='lg:text-[32px] text-white lg:pb-8 opacity-70'>Easily set your targets, track your progress, and stay motivated every step of the way</p>
                            </div>
                        </div>
                    </div>

                    {/*Right side - Carousel */}
                    <div className="lg:w-[60%] w-full">
                        <ClientCarousel />
                    </div>
                </div>
            </div>
        </section>
    )
}