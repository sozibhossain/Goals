import Image from 'next/image'
import React from 'react'

export default function MobileMockup() {
    return (
        <section className="relative w-full bg-[#1a1a1a] flex items-center justify-center py-16 md:py-24 overflow-hidden rounded-t-[20px] mt-[-20px]">
            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* {/ Phone mockups with mountain background /} */}
                    <div className="w-full lg:w-[40%] flex justify-center">
                        <div className="relative p-4">
                            <div className="relative rounded-3xl overflow-hidden lg:w-[480px] md:w-[648px] w-[360px] h-[660px]">
                                <Image
                                    src="/assets/mobilemockup/left_bg.png"
                                    alt="Mountain landscape background"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex justify-center items-center">
                                    {/* {/ Small device text & arrow /} */}
                                    <div className="absolute top-5 left-0 lg:hidden">
                                        <p className="md:text-[24px] text-[16px] text-center font-normal text-gray-950 bg-transparent backdrop-blur-lg border border-[#0007] rounded mx-2 lg:mx-0"> All your Goals. One Spot. No matter the goal, our dashboard delivers instant clarity. See your progress across every area of your life simplified.
                                        </p>
                                        <div className="absolute lg:-left-[420px] md:left-[300px] left-[10%] lg:top-16 top-[136px] md:top-[150px] w-[50%] md:w-[30%] h-full -rotate-90 z-30">
                                            <Image
                                                src="/assets/mobilemockup/arrow1.png"
                                                alt="Mountain landscape background"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    {/* {/ Two phone mockups /} */}
                                    <div className="relative flex space-x-2 mt-10 lg:mt-0">
                                        {/* {/ Left phone - Categories/Interests /} */}
                                        <div className="relative mt-[40px] lg:mt-[0px] h-[450px] w-[230px] hidden md:block">
                                            <Image
                                                src="/assets/mobilemockup/mock1.png"
                                                alt="App categories interface"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* {/ Right phone - Dashboard /} */}
                                        <div className="relative mt-[40px] lg:mt-[0px] md:h-[450px] h-[400px] md:w-[230px] w-[300px]">
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
                            <div className="absolute lg:-left-[50%]  lg:top-[50%] md:top-[70%] top-[100%]
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
                            <div className="absolute lg:-left-[52%] md:left-[48%] left-12 lg:top-[45%] md:-top-[110%] -top-[90px] lg:w-[53%] md:w-[21%] w-[32%] h-full lg:-rotate-6 rotate-90">
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
                            <p className="md:text-[24px] lg:text-[32px] p-2 text-center border lg:border-none"> Tap. Set. Achieve. The “+” button: Your fast track to starting new goals.
                            </p>
                            <div className="absolute mobileMockupArrow lg:-left-[38%] md:left-[47%] left-[110px] lg:-top-[145%] md:-top-[500%] -top-[115px] lg:w-[36%] md:w-[40%] w-[70%] h-full md:h-[400px] lg:rotate-12 rotate-90">
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