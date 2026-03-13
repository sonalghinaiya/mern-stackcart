import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-4 mt-5">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
