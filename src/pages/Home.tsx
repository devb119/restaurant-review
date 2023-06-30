import { Header } from "../components";
import { Outlet } from "react-router-dom";

function Home({
  getQuery,
}: {
  getQuery: (query: string, option: number) => void;
}) {
  return (
    <div className="font-montserrat">
      <Header getQueryData={getQuery} />
      <div className=" max-w-7xl mx-auto">
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Home;
