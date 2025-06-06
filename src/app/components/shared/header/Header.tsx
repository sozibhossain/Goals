'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderData } from '@/types/home'

export default function Header({ headerData }: { headerData: HeaderData }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <header className="bg-[#D9D9D9] rounded-[20px] sticky top-0 z-50">
            <nav aria-label="Global" className="container flex items-center justify-between pt-[10px] pb-3">
                <div className='flex items-center 2xl:gap-x-[420px] xl:gap-x-[220px] lg:gap-x-[110px]'>
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image
                                alt="Logo"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/headers/${headerData.img}`}
                                width={68}
                                height={68}
                                className="w-[68px] h-[68px]"
                                unoptimized
                            />
                        </Link>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Link href={headerData?.itemlink1 || "#"} className="text-[20px] font-normal leading-[100%] text-black">
                            {headerData?.item_name1 || "Features"}
                        </Link>
                        <Link href={headerData?.itemlink2 || "#"} className="text-[20px] font-normal leading-[100%] text-black">
                            {headerData?.item_name2 || "Contact Us"}
                        </Link>
                    </PopoverGroup>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-[12px]">
                    <div className='bg-black px-[20px] py-[6px] rounded-lg flex items-center justify-center'>
                        <Link href={headerData?.login_link || "#"} className="text-[20px] font-normal text-white mt-[-3px]">
                            Log in
                        </Link>
                    </div>
                    <div>
                        <Link href={headerData?.app_store_link || "/assets/appstore.webp"} className="w-[177px]">
                            <Image
                                src="/assets/appstore.webp"
                                width={140}
                                height={51}
                                alt="Google Play"
                                className="bg-black rounded-md w-[140px] h-[41px]"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href={headerData?.google_play_link || "/assets/googleplay.webp"} className="w-[199px]">
                            <Image
                                src="/assets/googleplay.webp"
                                width={199}
                                height={61}
                                alt="App Store"
                                className="bg-black rounded-md w-[140px] h-[41px]"
                            />
                        </Link>
                    </div>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image
                                alt="Logo"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/headers/${headerData.img}`}
                                width={68}
                                height={68}
                                className="w-[68px] h-[68px]"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href={headerData?.itemlink1 || "#"}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-black hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {headerData?.item_name1 || "Features"}
                                </Link>
                                <Link
                                    href={headerData?.itemlink2 || "#"}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-black hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {headerData?.item_name2 || "Contact Us"}
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    href={headerData?.login_link || "#"}
                                    className="-mx-3 block mb-4 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <div className='mb-4'>
                                    <Link href={headerData?.app_store_link || "/assets/appstore.webp"} className="w-[177px]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Image
                                            src="/assets/appstore.webp"
                                            width={140}
                                            height={51}
                                            alt="Google Play"
                                            className="bg-black rounded-md w-[140px] h-[41px]"
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link href={headerData?.google_play_link || "/assets/googleplay.webp"} className="w-[199px]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Image
                                            src="/assets/googleplay.webp"
                                            width={199}
                                            height={61}
                                            alt="App Store"
                                            className="bg-black rounded-md w-[140px] h-[41px]"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}


