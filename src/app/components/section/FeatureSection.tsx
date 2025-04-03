import Image from "next/image"

export default function FeatureSection() {
  return (
    <section className="w-full min-h-screen relative bg-[#e6d5b8] flex items-center rounded-t-[20px] mt-[-20px]">
      <div className="container">
        <div className="grid grid-cols-5 gap-4">
          {/* Left side - 4 Phone screens */}
          <div className="relative col-span-3">
            <div className="relative flex justify-start">
              {/* First phone */}
              <div className=" w-42 h-52 md:w-32 md:h-64 rounded-xl z-10 mr-4 rotate-6">
                <Image
                  src="/assets/feature-section/mobile1.png"
                  alt="Goals app dark theme interface"
                  fill
                />
              </div>

              {/* Second phone */}
              <div className="relative w-24 h-52 md:w-32 md:h-64 rounded-xl overflow-hidden rotate-16 z-20">
                <Image
                  src="/assets/featuresection/mobile2.png"
                  alt="Goals app chat interface"
                  fill
                  className=""
                />
              </div>

              {/* Third phone */}
              <div className="relative w-24 h-52 md:w-32 md:h-64 rounded-xl overflow-hidden -ml-6 mt-4 rotate-6 z-30">
                <Image
                  src="/assets/featuresection/mobile3.png"
                  alt="Goals app login screen"
                  fill
                  className=""
                />
              </div>

              {/* Fourth phone */}
              <div className="relative w-24 h-52 md:w-32 md:h-64 rounded-xl overflow-hidden -mt-2 -rotate-3 z-30">
                <Image
                  src="/assets/featuresection/mobile4.png"
                  alt="Goals app finance goals"
                  fill
                  className=""
                />
              </div>
            </div>

            {/* Bottom text */}
            <p className="text-[40px] text-white leading-[100%] font-normal text-center mt-8">
              Choose from 7 vibrant colors to match your personality <br /> and mood each day, creating a fresh tracking
              <br />experience uniquely yours.
            </p>
          </div>

          {/* Right side - Text and color palette */}
          <div className="col-span-2">
            <div>
              {/* Top text */}
              <p className="text-white text-sm mb-8 max-w-xs">
                With private messaging for easy goal collaboration, notification alerts, and a simple login process, Goals
                makes setting and achieving your goals effortless.
              </p>

              {/* Color palette - 7 vertical theme images */}
              <div className="relative w-full max-w-md aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
                <div className="grid grid-cols-7 h-full">
                  {/* Light theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color1.png"
                        alt="Light theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Yellow theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color2.png"
                        alt="Yellow theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Dark theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color3.png"
                        alt="Dark theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Pink theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color4.png"
                        alt="Pink theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Blue theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color5.png"
                        alt="Blue theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Red theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color6.png"
                        alt="Red theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Gray theme */}
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-col">
                      <Image
                        src="/assets/featuresection/color/color7.png"
                        alt="Gray theme"
                        width={60}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame label */}
        <div className="absolute bottom-4 left-4 text-gray-500 text-xs">Frame 2</div>
      </div>
    </section>
  )
}

