import React from "react";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import FeaturedProducts from "../products/FeaturedProducts";
import Newsletter from "./Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}

export default Home;
