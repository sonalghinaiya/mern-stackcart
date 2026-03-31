import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Features from "./components/Features";

function Layout() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <main className="max-w-6xl mx-auto p-4 mt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
