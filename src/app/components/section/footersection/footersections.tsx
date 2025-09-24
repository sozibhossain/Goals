import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "./contact-form"
import { FooterData } from "@/types/home"

export default function FooterSections({ footerData }: { footerData: FooterData }) {

  console.log(footerData, "footerData")

  return (
    <footer
      className="relative rounded-[20px] mt-[-20px]"
      style={{ backgroundColor: footerData?.color }}
    >
      <div className="container pt-12 pb-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Logo and Download Section */}
          <div className="col-span-12 lg:col-span-2">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-12">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  alt="Logo"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/settings/${footerData?.logo}`}
                  width={68}
                  height={68}
                  className="w-[68px] h-[68px]"
                />
              </Link>
            </div>

            <div className="flex flex-col space-y-8">
              <Link href={footerData.app_store_link} className="w-[177px]">
                <Image
                  src="/assets/appstore.webp"
                  width={177}
                  height={61}
                  alt="Google Play"
                  className="bg-black rounded-md w-[177px] h-[61px]"
                />
              </Link>
              <Link href={footerData.google_play_link} className="w-[199px]">
                <Image
                  src="/assets/googleplay.webp"
                  width={199}
                  height={61}
                  alt="App Store"
                  className="bg-black rounded-md w-[199px] h-[61px]"
                />
              </Link>

            </div>
          </div>

          <div className="col-span-12 lg:col-span-10">
            <div className="grid grid-cols-12 space-y-16 lg:space-y-0 lg:gap-8">
              {/* What we do Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">What we do</h3>
                <div className=" p-6 rounded-md h-full"
                  style={{ backgroundColor: footerData?.first_text_color }}>
                  <div dangerouslySetInnerHTML={{ __html: footerData?.first_text }} />
                </div>
              </div>

              {/* Who we are Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Who we are</h3>
                <div className=" p-6 rounded-md h-full"
                  style={{ backgroundColor: footerData?.second_text_color }}>

                  <div dangerouslySetInnerHTML={{ __html: footerData?.second_text }} />
                </div>
              </div>

              {/* Why use Goals Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Why use Goals</h3>
                <div className=" p-6 rounded-md h-full"
                  style={{ backgroundColor: footerData?.third_text_color }}
                >
                  <div dangerouslySetInnerHTML={{ __html: footerData?.third_text }} />
                </div>
              </div>
              {/* Contact Form Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Contact Goals App</h3>
                <div className="bg-white p-6 rounded-md">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Copyright */}
        <div className="mt-[80px] text-sm text-center lg:text-end">
          <p>{`${new Date().getFullYear()} © Goals by Splurjj`}</p>
        </div>
      </div>
    </footer>
  )
}
