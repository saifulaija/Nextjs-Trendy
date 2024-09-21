import BestSellingProducts from "@/components/home/bestSellingProduct/BestSellingProducts";
import NewArrivalProducts from "@/components/home/bestSellingProduct/newArrivalProduct/NewArrivalProducts";
import Hero from "@/components/home/hero/Hero";
import SubHero from "@/components/home/subHero/SubHero";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <SubHero />
      <NewArrivalProducts />
      <BestSellingProducts />
    </div>
  );
};

export default Home;
