import { FeatureData } from "@/types/home";
import Image from "next/image";

export default function FeatureSection({featureData}: {featureData: FeatureData}) {
  return (
    <section id="featureSection" className="bg-[#cab694] relative mt-[-20px] rounded-t-[20px] lg:py-32 py-16">
      <div className="container">
        <div className="grid grid-cols-5 gap-10 lg:gap-0">
          {/* {/ {/ Left side - 4 Phone screens /} /} */}
          <div className="col-span-5 lg:col-span-3 flex items-center justify-center">
            <div>
              <div className="relative flex items-center  justify-center featuresectionphones">
                {/* {/ {/ First phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 rounded-xl z-2 mr-4 rotate-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img1}`}
                    alt="Goals app dark theme interface"
                    fill
                  />
                </div>

                {/* {/ {/ Second phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 rounded-xl overflow-hidden rotate-16">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img2}`}
                    alt="Goals app chat interface"
                    fill
                    className=""
                  />
                </div>

                {/* {/ {/ Third phone /} /} */}
                <div className="relative w-24 h-32 md:w-60 md:h-80 rounded-xl overflow-hidden -ml-6 mt-4 rotate-6 z-10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img3}`}
                    alt="Goals app login screen"
                    fill
                    className=""
                  />
                </div>

                {/* {/ {/ Fourth phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 rounded-xl overflow-hidden -mt-2 -rotate-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img4}`}
                    alt="Goals app finance goals"
                    fill
                    className=""
                  />
                </div>
              </div>

              {/* {/ {/ Bottom text /} /} */}
              <p className="lg:text-[30px] md:text-[32px] text-[24px] text-white leading-[100%] font-normal text-center mt-[50px] lg:mt-[120px]">
                {featureData?.title1}
              </p>
            </div>
          </div>

          {/* {/ {/ Right side - Text and color palette /} /} */}
          <div className="col-span-5 lg:col-span-2 w-full">
            <div className="flex justify-center">
              {/* {/ {/ Top text /} /} */}
              <div className="">
                <p className="lg:text-[30px] md:text-[32px] text-[24px] text-white leading-[100%] font-normal text-center mb-8 md:mb-10 lg:mb-[120px]">
                {featureData?.title2}
                </p>

                <div className="relative lg:w-[600px] w-full lg:h-[300px] md:h-[300px] h-[200px] mx-auto lg:mx-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.all_mbl_img}`}
                    alt="Mobile view screenshot"
                    fill
                    className="w-full"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
