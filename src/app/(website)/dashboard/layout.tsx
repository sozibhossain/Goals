import React, { ReactNode } from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import DashboardNavbar from "./_components/dashboard-navbar";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white w-full ">
      
      <DashboardNavbar />
      <div className="w-full h-full md:flex lg:flex justify-start items-start ">
        <DashboardSidebar />
        <div className="w-full px-2 lg:px-7  pt-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;