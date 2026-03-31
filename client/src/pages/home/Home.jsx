import React from "react";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import FeaturedProducts from "../products/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
    </>
  );
}

export default Home;
