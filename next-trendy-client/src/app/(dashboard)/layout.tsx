

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Trendy",
  description: "Generated by create next app",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default DashboardLayout;
