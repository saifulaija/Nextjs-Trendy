import React from "react";

import { Metadata } from "next";
import { USER_ROLE } from "@/constants/role";
import { CategoryDashboard } from "@/components/shared/categoryDashboard/CategoryDashboard";

export const metadata: Metadata = {
  title: "Category Product | Trendy",
  description: "Generated by create next app",
};

const tagDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CategoryDashboard>{children}</CategoryDashboard>
    </div>
  );
};

export default tagDashboard;