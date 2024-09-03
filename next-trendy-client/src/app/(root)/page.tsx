
import BestSellingProducts from "@/components/home/bestSellingProduct/BestSellingProducts";
import Hero from "@/components/home/hero/Hero";
import SubHero from "@/components/home/subHero/SubHero";
import React from "react";

const Home = () => {
  return (
   <div>
   <Hero/>
   <SubHero/>
  {/* <BestSellingProducts/> */}
  <BestSellingProducts/>
   </div>
  );
};

export default Home;
