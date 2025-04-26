import { FeatureData } from "@/types/home";
import Image from "next/image";

export default function FeatureSection({featureData}: {featureData: FeatureData}) {
  return (
    <section className="bg-[#cab694] relative mt-[-20px] rounded-t-[20px] lg:py-32 py-16">
      <div className="container">
        <div className="grid grid-cols-5 gap-10 lg:gap-8">
          {/* {/ {/ Left side - 4 Phone screens /} /} */}
          <div className="col-span-5 lg:col-span-3 flex items-center justify-center">
            <div>
              <div className="relative flex items-center  justify-center featuresectionphones">
                {/* {/ {/ First phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 rounded-xl z-2 mr-4 md:ml-[80px] lg:ml-6 rotate-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img1}`}
                    alt="Goals app dark theme interface"
                    width={500}
                    height={500}
                    className="w-[150px] h-[200px] md:w-[150px] md:h-[350px] lg:w-[200px] lg:h-[400px]"
                  />
                </div>

                {/* {/ {/ Second phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 md:ml-[-50px] lg:ml-0 rounded-xl rotate-16">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img2}`}
                    alt="Goals app chat interface"
                    width={500}
                    height={500}
                    className="w-[150px] h-[200px] md:w-[150px] md:h-[350px] lg:w-[300px] lg:h-[400px]"
                  />
                </div>

                {/* {/ {/ Third phone /} /} */}
                <div className="relative w-24 h-32 md:w-60 md:h-80 rounded-xl -ml-6 md:ml-[-100px] lg:ml-[-80px] mt-4 rotate-6 z-10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img3}`}
                    alt="Goals app login screen"
                    width={500}
                    height={500}
                    className="w-[250px] h-[200px] md:w-[200px] md:h-[350px] lg:w-[300px] lg:h-[400px]"
                  />
                </div>

                {/* {/ {/ Fourth phone /} /} */}
                <div className="relative w-24 h-32 md:w-52 md:h-80 rounded-xl md:ml-[-65px]  -mt-2 lg:ml-[-40px] -rotate-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.mbl_img4}`}
                    alt="Goals app finance goals"
                    width={500}
                    height={500}
                    className="w-[150px] h-[200px] md:w-[150px] md:h-[350px] lg:w-[300px] lg:h-[400px]"
                  />
                </div>
              </div>

              {/* {/ {/ Bottom text /} /} */}
              <p className="lg:text-[30px] md:text-[32px] text-[24px] text-white leading-[100%] font-normal text-center mt-[90px] lg:mt-[120px]">
                {featureData?.title1}
              </p>
            </div>
          </div>

          {/* {/ {/ Right side - Text and color palette /} /} */}
          <div className="col-span-5 lg:col-span-2">
            <div className="flex items-center justify-center">
              {/* {/ {/ Top text /} /} */}
              <div className="">
                <p className="lg:text-[30px] md:text-[32px] text-[24px] text-white leading-[100%] font-normal text-center mb-8 md:mb-10 lg:mb-[120px]">
                {featureData?.title2}
                </p>

                <div className="flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/features/${featureData?.all_mbl_img}`}
                    alt="Mobile view screenshot"
                    width={500}
                    height={500}
                    className="w-[600px] h-[250px] md:w-[600px] md:h-[400px] lg:w-[600px] lg:h-[400px]"
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
