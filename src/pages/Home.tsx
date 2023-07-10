import { Header } from "../components";
import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "../components/Footer";

function Home({
  getQuery,
}: {
  getQuery: (query: string, option: number) => void;
}) {
  return (
    <div className="font-montserrat">
      <Header getQueryData={getQuery} />
      <div className=" max-w-7xl mx-auto">
        <div className="p-4 bg-transparent">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
