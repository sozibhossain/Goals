import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Footer() {
  return (
    <footer className="bg-[#d9c7a7] relative rounded-[20px] mt-[-20px]">
      <div className="container pt-12 pb-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Logo and Download Section */}
          <div className="col-span-12 lg:col-span-2">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-12">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  alt="Logo"
                  src="/assets/LOGO.png"
                  width={68}
                  height={68}
                  className="w-[68px] h-[68px]"
                />
              </Link>
            </div>

            <div className="flex flex-col space-y-8">
              <Link href="#" className="w-[177px]">
                <Image
                  src="/assets/appstore.webp"
                  width={177}
                  height={61}
                  alt="Google Play"
                  className="bg-black rounded-md w-[177px] h-[61px]"
                />
              </Link>
              <Link href="#" className="w-[199px]">
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
                <div className="bg-white p-6 rounded-md h-full">
                  <p className="text-sm">
                    At Goals by Splurij, we empower individuals and teams to take charge of their aspirations. Our platform
                    provides intuitive tools for setting, tracking, and achieving personal and professional goals. Whether
                    you&apos;re looking to enhance productivity, foster personal growth, or collaborate on team objectives, our
                    user-friendly interface makes it easy to break down big ambitions into actionable steps. With insightful
                    analytics and progress tracking, we help you stay motivated and accountable every step of the way.
                  </p>
                </div>
              </div>

              {/* Who we are Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Who we are</h3>
                <div className="bg-white p-6 rounded-md h-full">
                  <p className="text-sm">
                    We are a passionate team of goal-setting enthusiasts and productivity experts dedicated to transforming
                    the way people approach their ambitions. Our mission is to foster a culture of achievement by providing
                    innovative solutions that cater to the diverse needs of our users. With a blend of experience in
                    personal development, technology, and community building, we strive to create an inclusive environment
                    where everyone can thrive. At Goals by Splurij, we believe that every goal is within reach with the
                    right support and tools.
                  </p>
                </div>
              </div>

              {/* Why use Goals Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Why use Goals</h3>
                <div className="bg-white p-6 rounded-md h-full">
                  <p className="text-sm mb-4">
                    Choosing Goals by Splurij means investing in your future. Here&apos;s why our platform stands out:
                  </p>
                  <ul className="text-sm space-y-3">
                    <li>
                      <strong>- User-Friendly Experience:</strong> Our interface is designed to be intuitive, making
                      goal-setting a seamless process.
                    </li>
                    <li>
                      <strong>- Customization:</strong> Tailor your goals and plans to suit your unique needs and
                      preferences.
                    </li>
                    <li>
                      <strong>- Progress Tracking:</strong> Monitor your achievements and stay motivated with our insightful
                      analytics.
                    </li>
                    <li>
                      <strong>- Community Support:**</strong> Join a vibrant community of like-minded individuals who share
                      your journey and offer encouragement.
                    </li>
                    <li>
                      <strong>- **Accountability Tools:**</strong> Keep yourself on track with reminders and collaborative
                      features for team goals.
                    </li>
                  </ul>
                </div>
              </div>
              {/* Contact Form Section */}
              <div className="col-span-12 lg:col-span-3">
                <h3 className="flex justify-center mb-2 lg:mb-8 text-xl font-normal">Contact Goals App</h3>
                <div className="bg-white p-6 rounded-md">
                  <form className="space-y-4">
                    <div>
                      <Input type="text" placeholder="Name" className="bg-white border-gray-200" />
                    </div>
                    <div>
                      <Input type="tel" placeholder="Number" className="bg-white border-gray-200" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Email" className="bg-white border-gray-200" />
                    </div>
                    <div>
                      <Textarea placeholder="Message" className="bg-white border-gray-200" />
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800">Submit</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Copyright */}
        <div className="mt-[80px] text-sm text-center lg:text-start">
          <p>2025 © Goals by Splurij</p>
        </div>
      </div>
    </footer>
  )
}
