

import Footer from "@/components/shared/footer/Footer";
import GoToTop from "@/components/shared/goToTop/GoToTop";
import Header from "@/components/shared/header/Header";
import { SiteHeader } from "@/components/shared/NewHeader/SiteHeader";

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
     <Header/>
     {/* <SiteHeader/> */}
      <main className="flex-1 mt-20 overflow-y-auto">{children}</main>
      <Footer />
      <GoToTop />
    </div>
  );
}
