import { useState } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

function Home({getQuery}:{getQuery:any}) {
  return (
    <>
      <Header getQueryData={getQuery} />
      <div className=" max-w-7xl mx-auto font-montserrat">
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Home;