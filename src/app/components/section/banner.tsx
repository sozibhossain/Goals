import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Banner() {
    return (
        <div className="relative w-full h-screen overflow-hidden rounded-t-[20px] mt-[-130px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/banner.png"
                    alt="Forest cabin at dusk"
                    fill
                    priority
                    className="object-cover brightness-[0.85]"
                />
            </div>

            {/* Content Overlay */}
            <div className="flex relative z-10 flex-col justify-center h-full container">
                <div className="lg:flex items-center gap-[70px]">
                    <div className="hiden md:block lg:block">
                        <Image
                            src="/assets/Banner-mobile.png"
                            alt="Logo"
                            width={225}
                            height={550}
                            className="w-[225px] h-[550px]"
                        />
                    </div>
                    <div className="">
                        <h1 className="text-[600%] font-normal leading-[100%] text-white mb-4">SMART Goal <br/>Setting</h1>
                        <p className="text-[32px] leading-[100%] font-normal text-white mb-11">Turn Goals into Done.</p>
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-[#4BA135] text-black w-[190px] h-[84px] text-[36px]">Download</Button>
                            <Button
                                className="bg-white text-black w-[169px] h-[84px] text-[36px]"
                            >
                                Log in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

