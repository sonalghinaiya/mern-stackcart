import React from "react";
import Hero from "../../components/home/Hero"
import Features from "../../components/home/Features"
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
