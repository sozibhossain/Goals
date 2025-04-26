import React, { ReactNode } from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white w-full ">
      <div className="w-full h-full md:flex lg:flex justify-start items-start ">
        <DashboardSidebar />
        <div className="w-full px-2 lg:px-7  pt-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;