import BestSellingProducts from "@/components/home/bestSellingProduct/BestSellingProducts";
import NewArrivalProducts from "@/components/home/bestSellingProduct/newArrivalProduct/NewArrivalProducts";
import Hero from "@/components/home/hero/Hero";
import KidsCollections from "@/components/home/kidsCollections/KidsCollections";
import LadiesCollections from "@/components/home/ladiesCollections/LadiesCollections";
import MensCollections from "@/components/home/mensCollections/MensCollections";
import SubHero from "@/components/home/subHero/SubHero";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <SubHero />
      <NewArrivalProducts />
      <BestSellingProducts />
      <MensCollections/>
      <LadiesCollections/>
      <KidsCollections/>
    </>
  );
};

export default Home;
