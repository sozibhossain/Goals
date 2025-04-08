import Image from "next/image"

export default function Banner() {
    return (
        <section className="relative w-full lg:h-screen h-[70vh] overflow-hidden rounded-t-[20px] mt-[-130px]">
            {/* {/ / Background Image / /} */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/banner.png"
                    alt="Forest cabin at dusk"
                    fill
                    priority
                    className="object-cover brightness-[0.85]"
                />
            </div>

            {/* {/ / Content Overlay / /} */}
            <div className="flex relative z-10 flex-col justify-center h-full container">
                <div className="lg:flex items-center gap-[70px]">
                    <div className="hiden md:block lg:block">
                        <Image
                            src="/assets/Banner-mobile.png"
                            alt="Logo"
                            width={225}
                            height={550}
                            className="w-[225px] h-[550px] hidden lg:block"
                        />
                    </div>
                    <div className="">
                        <h1 className="lg:text-[600%] md:text-[400%] text-[300%] font-normal leading-[120%] text-white mb-4 max-w-[528px]">SMART Goal Setting</h1>
                        <p className="text-[32px] leading-[100%] font-normal text-white mb-11">Turn Goals into Done.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[#4BA135] text-black lg:w-[190px] w-[150px] lg:h-[84px] h-[70px] lg:text-[36px] text-[24px] rounded-[20px]">Download</button>
                            <button
                                className="bg-white text-black lg:w-[169px] w-[150px] lg:h-[84px] h-[70px] lg:text-[36px] text-[24px] rounded-[20px]"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

