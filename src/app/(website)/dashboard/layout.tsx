// app/(admin)/dashboard/layout.tsx


import React, { ReactNode } from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import AuthWrapper from "@/components/AuthWrapper"; // adjust path if needed

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper>
      <div className="bg-white w-full">
        <div className="w-full h-full md:flex lg:flex justify-start items-start">
          <DashboardSidebar />
          <div className="w-full px-2 lg:px-7 pt-6">{children}</div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default AdminDashboardLayout;
