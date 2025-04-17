"use client"

import { Sidebarcontents } from "@/data/admin-dashboard-data"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
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
import { signOut } from "next-auth/react";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)


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

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="hidden md:block lg:block pl-8 pt-4">
          <Link href="/" className="flex items-center ">
            <Image src="/assets/headerlogo.png" alt="logo" width={64} height={64} className="w-[64px] h-[64px]" />
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
