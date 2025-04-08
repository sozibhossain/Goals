import Image from 'next/image'
import React from 'react'

export default function MobileMockup() {
    return (
        <section className="relative w-full bg-[#1a1a1a] flex items-center justify-center py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* {/ Phone mockups with mountain background /} */}
                    <div className="w-full lg:w-[40%] flex justify-center">
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden md:w-[648px] w-[410px] h-[700px]">
                                <Image
                                    src="/assets/mobilemockup/left_bg.png"
                                    alt="Mountain landscape background"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex justify-center items-center">
                                    {/* {/ Small device text & arrow /} */}
                                    <div className="absolute top-5 left-0 lg:hidden">
                                        <p className="md:text-[24px] text-[18px] text-center font-normal text-gray-950 bg-transparent backdrop-blur-lg border-2 border-[#000] mx-2 lg:mx-0"> All your Goals. One Spot. No matter the goal, our dashboard delivers instant clarity. See your progress across every area of your life simplified.
                                        </p>
                                        <div className="absolute lg:-left-[420px] md:left-[330px] left-24 lg:top-16 top-36 md:top-[150px] w-[50%] md:w-[30%] h-full -rotate-90 z-30">
                                            <Image
                                                src="/assets/mobilemockup/arrow1.png"
                                                alt="Mountain landscape background"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    {/* {/ Two phone mockups /} */}
                                    <div className="relative flex space-x-4 mt-10 lg:mt-0">
                                        {/* {/ Left phone - Categories/Interests /} */}
                                        <div className="relative h-[450px] w-[230px] hidden md:block">
                                            <Image
                                                src="/assets/mobilemockup/mock1.png"
                                                alt="App categories interface"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* {/ Right phone - Dashboard /} */}
                                        <div className="relative md:h-[450px] h-[400px] md:w-[230px] w-[400px]">
                                            <Image
                                                src="/assets/mobilemockup/mock2.png"
                                                alt="App dashboard interface"
                                                fill
                                                className='object-contain md:scale-x-100 scale-x-150 md:scale-y-100 scale-y-125'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {/ Feature descriptions /} */}
                    <div className="w-full lg:w-[50%] text-white flex flex-col lg:gap-8 gap-6">
                        {/* {/ Feature 1 /} */}
                        <div className="relative hidden lg:block">
                            <p className="md:text-[32px] text-[18px] text-center font-normal"> All your Goals. One Spot. No matter the goal, our dashboard delivers instant clarity. See your progress across every area of your life simplified.
                            </p>
                            <div className="absolute lg:-left-[420px] lg:top-16
                             w-[48%] h-full">
                                <Image
                                    src="/assets/mobilemockup/arrow1.png"
                                    alt="Mountain landscape background"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {/* {/ Feature 2 /} */}
                        <div className="relative md:mt-3">
                            <p className="md:text-[24px] lg:text-[32px] text-[18px] text-center border lg:border-none"> Choose from a variety of interests using the easy thumb button at the bottom left and become inspired by the journeys of others.
                            </p>
                            <div className="absolute lg:-left-[500px] md:left-[345px] left-12 lg:top-20 md:-top-28 -top-[100px] lg:w-[53%] md:w-[21%] w-[32%] h-full lg:-rotate-6 rotate-90">
                                <Image
                                    src="/assets/mobilemockup/arrow1.png"
                                    alt="Mountain landscape background"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* {/ Feature 3 /} */}
                        <div className="relative">
                            <p className="md:text-[24px] lg:text-[32px] text-center border lg:border-none"> Tap. Set. Achieve. The “+” button: Your fast track to starting new goals.
                            </p>
                            <div className="absolute lg:-left-[335px] md:left-[415px] left-40 lg:-top-4 md:-top-44 -top-[155px] lg:w-[36%] md:w-[40%] w-[70%] h-full lg:rotate-6 rotate-90">
                                <Image
                                    src="/assets/mobilemockup/arrow2.png"
                                    alt="Mountain landscape background"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}