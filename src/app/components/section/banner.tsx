import Image from "next/image"
import Link from "next/link"

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
            <div className="flex relative flex-col justify-center h-full container">
                <div className="lg:flex items-center gap-[70px]">
                    <div className="hiden md:block lg:block">
                        <img
                            src="/assets/Banner-mobile.png"
                            alt="Logo"
                            width={225}
                            height={550}
                            className="w-[225px] h-[550px] hidden lg:block"
                        />
                    </div>
                    <div className="">
                        <h1 className="lg:text-[600%] md:text-[400%] text-[250%] font-normal leading-[120%] text-white mb-4 max-w-[528px]">SMART Goal Setting</h1>
                        <p className="text-[22px] lg:text-[32px] leading-[100%] font-normal text-white mb-11">Turn Goals into Done.</p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex gap-4">
                                <Link href="#" className="">
                                    <Image
                                        src="/assets/appstore.webp"
                                        width={177}
                                        height={61}
                                        alt="Google Play"
                                        className="bg-black rounded-md w-[155px] h-[41px] lg:w-[177px] lg:h-[61px]"
                                    />
                                </Link>
                                <Link href="#" className="">
                                    <Image
                                        src="/assets/googleplay.webp"
                                        width={199}
                                        height={61}
                                        alt="App Store"
                                        className="bg-black rounded-md w-[166px] h-[41px] lg:w-[199px] lg:h-[61px]"
                                    />
                                </Link>
                            </div>
                            <button
                                className="bg-white text-black px-11 lg:px-8 text-[24px] rounded-lg"
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

