"use client"

import { Sidebarcontents } from "@/data/admin-dashboard-data"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, Settings } from "lucide-react"
import LogoutModal from "@/app/components/shared/logoutModal"
import DashboardSidebarItem from "./dashboard-sidebar-item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import { HeaderData } from "@/types/home"

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);




  const handleLogout = async () => {
    try {
      toast.success("You have successfully logged out!"); // Show toast first

      setTimeout(async () => {
        await signOut({ callbackUrl: "/" }); // Redirect after toast is shown
      }, 2000); // Wait for 2 seconds to let toast appear
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again."); // Show error toast
    }
  };

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/header`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setHeaderData(data); // Assuming your API response is { data: {...} }
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      } 
    };
  
    fetchHeaderData();
  }, [token]);

  

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className=" lg:block pl-8 pt-4">
          <Link href="/" className="flex items-center">
            <Image
              src={headerData?.img || "/default-logo.png"}
              alt="logo"
              width={64}
              height={64}
              className="w-[64px] h-[64px]" />
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4">
          <div className="mt-4">
            {Sidebarcontents?.map((item) => (
              <DashboardSidebarItem key={item?.id} item={item} />
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter className="px-4 pb-6">
          <Link href="/dashboard/settings" className="pl-4 flex items-center justify-start gap-2 text-lg font-medium text-black leading-[120%]"><Settings className="w-4 h-4"/>Settings</Link>
          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            className="w-full flex items-center justify-start gap-4 text-lg font-medium text-black leading-[120%] shadow-none border-none"
          >
            <LogOut /> Log out
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile header with trigger */}
      <div className="flex h-16 items-center border-b px-4 md:hidden">
        <SidebarTrigger>
          <Menu className="h-6 w-6" />
        </SidebarTrigger>
      </div>

      {/* Logout modal */}
      {isOpen && (
        <LogoutModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </SidebarProvider>
  )
}

export default DashboardSidebar
