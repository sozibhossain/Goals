import { MdOutlineShoppingBag } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";

import { ReactNode } from "react";

export type SidebarContentType = {
    id: number;
    name: string;
    icon: ReactNode;
    href: string;
};

export const Sidebarcontents: SidebarContentType[] = [
    {
        id: 1,
        name: "Header",
        icon: <MdOutlineShoppingBag className="w-4 h-4"/>, 
        href: "/dashboard",
    },
    {
        id: 2,
        name: "Hero section",
        icon: <AiOutlineBars className="w-4 h-4"/>, 
        href: "/admin-dashboard/hero-section",
    },
    {
        id: 3,
        name: "Features",
        icon: <IoCartOutline className="w-4 h-4"/>, 
        href: "/admin-dashboard/features",
    },
    {
        id: 4, 
        name: "Footer",
        icon: <FiUsers className="w-4 h-4"/>, 
        href: "/dashboard/footer",
    },
];